import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';
import { DebitData } from './types';
import { Debit } from 'src/school';
import { DebitState } from 'src/school/debit/enums';
import { summaryDebits } from './helpers';
import Decimal from 'decimal.js';

@Injectable()
export class DebitsService {
  constructor(
    @InjectRepository(Debit)
    private readonly _debitRepository: Repository<Debit>,
  ) {}

  // public async incomesDownload(params: IncomeParams) {
  //   const { start, end } = params;

  //   const data = await this.getIncomesData(params);

  //   const document = incomesExcel(data, start, end);

  //   return {
  //     document,
  //   };
  // }

  public async debits(params: IncomeParams) {
    const data = await this.getIncomesData(params);
    const summary = summaryDebits(data);

    return {
      summary,
      data,
    };
  }

  private async getIncomesData(
    params: IncomeParams,
  ): Promise<Array<DebitData>> {
    const { start, end, branchId } = params;

    const query = this._debitRepository.createQueryBuilder('debit');
    query.innerJoinAndSelect('debit.branch', 'branch');
    query.innerJoinAndSelect('debit.student', 'student');
    query.innerJoinAndSelect('debit.enrollment', 'enrollment');
    // TODO: Obtener los concepto que tengan un income pagado o pendiente
    query.innerJoinAndSelect('debit.concepts', 'concept');
    query.where('branch.id = :branchId', { branchId });
    query.andWhere('debit.dueDate BETWEEN :start AND :end', { start, end });
    query.andWhere('debit.state IN (:...state)', {
      state: [DebitState.DEBT, DebitState.PAID, DebitState.PARTIALLY_PAID],
    });
    query.orderBy('debit.dueDate', 'DESC');

    query.select([
      'debit.id',
      'debit.description',
      'debit.amount',
      'debit.discount',
      'debit.subtotal',
      'debit.taxes',
      'debit.total',
      'debit.withTax',
      'debit.state',
      'debit.dueDate',
      'debit.paymentDate',
      'branch.id',
      'branch.name',
      'student.id',
      'student.fullname',
      'enrollment.details',
      'concept.id',
      'concept.description',
      'concept.subtotal',
      'concept.taxes',
      'concept.total',
      'concept.pendingPayment',
      'concept.withTax',
    ]);

    const response = await query.getMany();

    return response.map((debit): DebitData => {
      const concept = debit.concepts.at(0) ?? null;
      const pendingPayment = new Decimal(concept?.pendingPayment ?? 0);
      const total = new Decimal(concept?.total ?? 0);
      const received = total.minus(pendingPayment);

      return {
        debitId: debit.id,
        debitDescription: debit.description,
        debitAmount: `${debit.amount}`,
        debitDiscount: `${debit.discount}`,
        debitSubtotal: `${debit.subtotal}`,
        debitTaxes: `${debit.taxes}`,
        debitTotal: `${debit.total}`,
        debitWithTax: debit.withTax,
        debitState: debit.state,
        debitDueDate: debit.dueDate,
        debitPaymentDate: debit.paymentDate,
        branchId: debit.branch.id,
        branchName: debit.branch.name,
        studentId: debit.student.id,
        studentFullname: debit.student.fullname,
        conceptId: concept?.id ?? null,
        conceptDescription: concept?.description ?? null,
        conceptSubtotal: concept?.subtotal ? `${concept?.subtotal}` : null,
        conceptTaxes: concept?.taxes ? `${concept?.taxes}` : null,
        conceptTotal: concept?.total ? `${concept?.total}` : null,
        conceptPendingPayment: concept?.pendingPayment
          ? `${concept?.pendingPayment}`
          : null,
        conceptReceived: concept ? received.toString() : null,
        conceptWithTax: concept?.withTax ?? null,
      };
    });
  }
}
