import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { Concept, Payment } from 'src/finance';
import { IncomeState } from 'src/finance/income/enum';
import { PaymentState } from 'src/finance/payment/enum';
import { Enrollment } from 'src/school';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';
import { incomesByDisciplinesExcel } from './templates';
import {
  ConceptData,
  ConceptWithIncomeData,
  IncomeDisciplineData,
  MonthlyByDisciplineData,
  ScheduleData,
} from './types';
import { calculateMonthlyHours, groupMonthlyByDiscipline } from './helpers';

@Injectable()
export class IncomesByDisciplinesService {
  private readonly logger = new Logger(IncomesByDisciplinesService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly _paymentRepository: Repository<Payment>,
    @InjectRepository(Concept)
    private readonly _conceptRepository: Repository<Concept>,
    @InjectRepository(Enrollment)
    private readonly _enrollmentRepository: Repository<Enrollment>,
  ) {}

  public async incomesDownload(params: IncomeParams) {
    const { start, end } = params;

    const { otherItems, monthlyDetailsItems } =
      await this.getIncomesData(params);

    const document = incomesByDisciplinesExcel(
      otherItems,
      monthlyDetailsItems,
      start,
      end,
    );

    return {
      document,
    };
  }

  public async incomesByDisciplines(params: IncomeParams) {
    const {
      otherItems,
      monthlyDetailsItems,
      receivedPerMonthlyItems,
      receivedPerOtherItems,
    } = await this.getIncomesData(params);

    const groupedByDiscipline = groupMonthlyByDiscipline(monthlyDetailsItems);

    groupedByDiscipline.push({
      id: 'other',
      name: 'Otros ingresos',
      count: receivedPerOtherItems,
    });

    const total = new Decimal(receivedPerMonthlyItems)
      .plus(new Decimal(receivedPerOtherItems))
      .toString();

    return {
      otherItems,
      monthlyDetailsItems,
      receivedPerMonthlyItems,
      groupedByDiscipline: groupedByDiscipline.toSorted((a, b) =>
        new Decimal(b.count).comparedTo(new Decimal(a.count)),
      ),
      receivedPerOtherItems,
      total: total.toString(),
    };
  }

  private async getIncomesData(params: IncomeParams) {
    const incomeGroups = await this._fetchIncomes(params);
    const incomeIDs = Array.from(incomeGroups.values()).map(
      (data) => data.incomeId,
    );
    // TODO: Aplicar pagos en conceptos para filtrar los que ya están pagados con fechas
    const details = await this._fetchConceptsByIncomeIDs(incomeIDs);

    const concepts = details.map((concept): ConceptWithIncomeData => {
      const income = incomeGroups.get(concept.incomeId) as IncomeDisciplineData;

      if (!income) {
        this.logger.warn(
          `No income found for concept ${concept.conceptId} with income ID ${concept.incomeId}`,
        );
      }

      return {
        ...concept,
        ...income,
      };
    });

    const enrollmentIDs = [
      ...new Set(concepts.map((concept) => concept.enrollmentId)),
    ];

    // Use a single pass to separate monthly and other items for better performance
    const monthlyItems: ConceptWithIncomeData[] = [];
    const otherItems: ConceptWithIncomeData[] = [];

    for (const concept of concepts) {
      if (concept.conceptDescription.includes('Mensualidad')) {
        monthlyItems.push(concept);
      } else {
        otherItems.push(concept);
      }
    }

    const schedules = await this._fetchSchedules(enrollmentIDs);

    const monthlyDetailsItems: Array<MonthlyByDisciplineData> =
      monthlyItems.flatMap((monthly) => {
        const matchedSchedules = schedules.get(monthly.enrollmentId) ?? [];
        const conceptReceived = new Decimal(monthly.conceptReceived ?? 0);
        if (matchedSchedules.length == 0) {
          this.logger.warn(
            `No matched schedules for enrollment ${monthly.enrollmentId} in concept ${monthly.conceptId} with debit ${monthly.debitId}`,
          );
        }

        const income = incomeGroups.get(
          monthly.incomeId,
        ) as IncomeDisciplineData;

        if (!income) {
          this.logger.warn(
            `No income found for concept ${monthly.conceptId} with income ID ${monthly.incomeId}`,
          );
        }

        return matchedSchedules.map((schedule) => {
          const monthlyHours = new Decimal(schedule.enrollmentHours ?? 1);
          const receivedPerHour = conceptReceived.dividedBy(monthlyHours);
          const receivedPerDiscipline = receivedPerHour.mul(
            schedule.disciplineTotalHours,
          );

          return {
            ...monthly,
            ...schedule,
            ...income,
            receivedPerHour: receivedPerHour.toString(),
            receivedPerDiscipline: receivedPerDiscipline.toString(),
          };
        });
      });

    const receivedPerOtherItems = otherItems.reduce((acc, item) => {
      return acc.plus(new Decimal(item.conceptReceived ?? 0));
    }, new Decimal(0));

    const receivedPerMonthlyItems = monthlyDetailsItems.reduce((acc, item) => {
      return acc.plus(new Decimal(item.receivedPerDiscipline ?? 0));
    }, new Decimal(0));

    return {
      otherItems,
      monthlyDetailsItems,
      receivedPerOtherItems: receivedPerOtherItems.toString(),
      receivedPerMonthlyItems: receivedPerMonthlyItems.toString(),
    };
  }

  private async _fetchSchedules(enrollmentIDs: Array<string>) {
    if (!enrollmentIDs.length) return new Map<string, ScheduleData[]>();

    const query = this._enrollmentRepository.createQueryBuilder('enrollment');
    query.withDeleted();
    query.innerJoinAndSelect(
      'enrollment.schedules',
      'schedule',
      'schedule.deletedAt IS NULL',
    );
    query.innerJoinAndSelect('enrollment.student', 'student');
    query.innerJoinAndSelect('schedule.discipline', 'discipline');

    query.where('enrollment.id IN (:...enrollmentIDs)', { enrollmentIDs });

    query.select([
      'schedule.id',
      'schedule.day',
      'schedule.start',
      'schedule.end',
      'student.id',
      'student.fullname',
      'enrollment.id',
      'discipline.id',
      'discipline.name',
    ]);

    const enrollments = await query.getMany();

    const schedules = enrollments.flatMap((enrollment) => {
      const hours = calculateMonthlyHours(enrollment.schedules);

      return hours.hoursByDiscipline.map((discipline) => ({
        enrollmentId: enrollment.id,
        enrollmentHours: hours.totalHours,
        studentId: enrollment.student.id,
        studentFullname: enrollment.student.fullname,
        disciplineId: discipline.disciplineId,
        disciplineName: discipline.disciplineName,
        disciplineTotalHours: discipline.totalHours,
      }));
    });

    const groups = schedules.reduce((acc, schedule) => {
      if (!acc.has(schedule.enrollmentId)) {
        acc.set(schedule.enrollmentId, []);
      }
      acc.get(schedule.enrollmentId)!.push(schedule);
      return acc;
    }, new Map<string, ScheduleData[]>());

    return groups;
  }

  private async _fetchIncomes(params: IncomeParams) {
    const { start, end, branchId } = params;

    const query = this._paymentRepository.createQueryBuilder('payment');
    query.withDeleted();
    query.innerJoinAndSelect(
      'payment.income',
      'income',
      'income.deletedAt IS NULL',
    );
    query.innerJoinAndSelect('income.branch', 'branch');
    query.innerJoinAndSelect('income.students', 'student');
    query.where('payment.deletedAt IS NULL');
    query.andWhere('branch.id = :branchId', { branchId });
    query.andWhere('payment.date BETWEEN :start AND :end', { start, end });
    query.andWhere('payment.state = :state', { state: PaymentState.PAID });
    query.andWhere('income.state != :cancelled', {
      cancelled: IncomeState.CANCELLED,
    });
    query.orderBy('payment.date', 'DESC');
    query.select([
      'payment.id',
      'payment.state',
      'payment.date',
      'payment.amount',
      'income.id',
      'income.folio',
      'income.state',
      'income.date',
      'branch.id',
      'branch.name',
      'student.id',
      'student.fullname',
    ]);
    const payments = await query.getMany();

    const groups = payments.reduce((acc, payment) => {
      if (!acc.has(payment.income.id)) {
        acc.set(payment.income.id, {
          incomeId: payment.income.id,
          incomeFolio: payment.income.folio,
          incomeState: payment.income.state,
          incomeDate: payment.income.date.toISOString(),
          branchId: payment.income.branch.id,
          branchName: payment.income.branch.name,
          students: payment.income.students.map((student) => ({
            id: student.id,
            fullname: student.fullname,
          })),
          received: 0,
        });
      }

      if (acc.has(payment.income.id)) {
        const receivedDecimal = new Decimal(
          acc.get(payment.income.id)!.received,
        );

        acc.get(payment.income.id)!.received = receivedDecimal
          .add(payment.amount)
          .toNumber();
      }

      return acc;
    }, new Map<string, IncomeDisciplineData>());

    return groups;
  }

  private async _fetchConceptsByIncomeIDs(
    incomeIDs: Array<string>,
  ): Promise<Array<ConceptData>> {
    if (!incomeIDs.length) return [];

    const query = this._conceptRepository.createQueryBuilder('concept');
    query.withDeleted();
    query.innerJoin('concept.income', 'income', 'income.deletedAt IS NULL');
    // TODO: Solo obtener un adeudo por concepto
    query.innerJoinAndSelect('concept.debits', 'debit');
    query.innerJoin('debit.enrollment', 'enrollment');
    query.select([
      'concept.id',
      'concept.description',
      'concept.total',
      'concept.pendingPayment',
      'concept.incomeId',
      'concept.withTax',
      'debit.id',
      'debit.enrollmentId',
      'enrollment.details',
    ]);
    query.where('concept.deletedAt IS NULL');
    query.andWhere('income.id IN (:...incomeIDs)', { incomeIDs });

    const concepts = await query.getMany();

    return concepts.map((concept) => {
      const debit = concept.debits?.[0];

      const pendingDecimal = new Decimal(concept.pendingPayment);
      const totalDecimal = new Decimal(concept.total);

      return {
        conceptId: concept.id,
        conceptDescription: concept.description,
        conceptTotal: `${concept.total}`,
        conceptPendingPayment: `${concept.pendingPayment}`,
        conceptWithTax: concept.withTax,
        conceptReceived: totalDecimal.minus(pendingDecimal).toString(),
        incomeId: concept.incomeId,
        debitId: debit?.id ?? '',
        enrollmentId: debit?.enrollmentId ?? '',
        enrollmentDetails: debit?.enrollment.details ?? '',
      };
    });
  }
}
