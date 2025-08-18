import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';
import { DebitData } from './types';
import { Debit } from 'src/school';

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
    console.log(data);
    // const groupedByMethod = groupIncomeByPaymentMethod(data);
    // const total = totalIncome(data);

    return {
      // groupedByMethod,
      // total,
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
    query.where('branch.id = :branchId', { branchId });
    query.andWhere('debit.dueDate BETWEEN :start AND :end', { start, end });
    query.orderBy('debit.dueDate', 'DESC');

    query.select([
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
    ]);

    const response = await query.getMany();

    return response.map((debit) => ({
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
    }));
  }
}
