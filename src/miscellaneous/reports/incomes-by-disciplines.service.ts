import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { Concept, Payment } from 'src/finance';
import { IncomeState } from 'src/finance/income/enum';
import { PaymentState } from 'src/finance/payment/enum';
import { Enrollment } from 'src/school';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';
import { incomesExcel } from './templates';
import { ConceptData, IncomeDisciplineData, ScheduleData } from './types';
import { calculateMonthlyHours } from './helpers';

@Injectable()
export class IncomesByDisciplinesService {
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

    const document = incomesExcel([], start, end);

    return {
      document,
    };
  }

  public async incomesByDisciplines(params: IncomeParams) {
    const { otherItems, monthlyDetailsItems } =
      await this.getIncomesData(params);

    // const groupedByMethod = groupIncomeByPaymentMethod(data);
    // const total = totalIncome(data);

    return {
      // groupedByMethod,
      // total,
      otherItems,
    };
  }

  private async getIncomesData(params: IncomeParams) {
    const incomes = await this._fetchIncomes(params);

    const incomeIDs = incomes.map((data) => data.incomeId);
    // TODO: Aplicar pagos en conceptos para filtrar los que ya están pagados con fechas
    const concepts = await this._fetchConceptsByIncomeIDs(incomeIDs);

    const enrollmentIDs = [
      ...new Set(concepts.map((concept) => concept.enrollmentId)),
    ];

    // Use a single pass to separate monthly and other items for better performance
    const monthlyItems: ConceptData[] = [];
    const otherItems: ConceptData[] = [];

    for (const concept of concepts) {
      if (concept.conceptDescription.includes('Mensualidad')) {
        monthlyItems.push(concept);
      } else {
        otherItems.push(concept);
      }
    }

    const schedules = await this._fetchSchedules(enrollmentIDs);

    const monthlyDetailsItems = monthlyItems.flatMap((monthly) => {
      const matchedSchedules = schedules.get(monthly.enrollmentId) ?? [];
      const conceptReceived = new Decimal(monthly.conceptReceived ?? 0);
      if (matchedSchedules.length == 0) {
        console.log('No matched for', monthly);
      }
      // console.log('Matched', matchedSchedules.length);

      return matchedSchedules.map((schedule) => {
        const monthlyHours = new Decimal(schedule.enrollmentHours ?? 1);
        const receivedPerHour = conceptReceived.dividedBy(monthlyHours);
        const receivedPerDiscipline = receivedPerHour.mul(
          schedule.disciplineTotalHours,
        );

        return {
          ...monthly,
          ...schedule,
          receivedPerHour: receivedPerHour.toString(),
          receivedPerDiscipline: receivedPerDiscipline.toString(),
        };
      });
    });
    // console.log(monthlyDetailsItems);
    return {
      otherItems,
      monthlyDetailsItems,
    };
  }

  private async _fetchSchedules(enrollmentIDs: Array<string>) {
    if (!enrollmentIDs.length) return new Map<string, ScheduleData[]>();

    const query = this._enrollmentRepository.createQueryBuilder('enrollment');

    query.innerJoinAndSelect('enrollment.schedules', 'schedule');
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

    query.innerJoinAndSelect('payment.income', 'income');
    query.innerJoinAndSelect('income.branch', 'branch');
    query.innerJoinAndSelect('income.students', 'student');
    query.where('branch.id = :branchId', { branchId });
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

    return Array.from(groups.values());
  }

  private async _fetchConceptsByIncomeIDs(
    incomeIDs: Array<string>,
  ): Promise<Array<ConceptData>> {
    if (!incomeIDs.length) return [];

    const query = this._conceptRepository.createQueryBuilder('concept');

    query.innerJoin('concept.income', 'income');
    query.innerJoinAndSelect('concept.debits', 'debit');
    query.select([
      'concept.id',
      'concept.description',
      'concept.total',
      'concept.pendingPayment',
      'concept.incomeId',
      'debit.id',
      'debit.enrollmentId',
    ]);
    query.where('income.id IN (:...incomeIDs)', { incomeIDs });

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
        conceptReceived: totalDecimal.minus(pendingDecimal).toString(),
        incomeId: concept.incomeId,
        debitId: debit?.id ?? '',
        enrollmentId: debit?.enrollmentId ?? '',
      };
    });
  }
}
