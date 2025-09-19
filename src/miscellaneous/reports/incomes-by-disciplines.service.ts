import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/finance';
import { IncomeState } from 'src/finance/income/enum';
import { PaymentState } from 'src/finance/payment/enum';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';
import { incomesExcel } from './templates';
import { IncomeData } from './types';

@Injectable()
export class IncomesByDisciplinesService {
  constructor(
    @InjectRepository(Payment)
    private readonly _paymentRepository: Repository<Payment>,
  ) {}

  public async incomesDownload(params: IncomeParams) {
    const { start, end } = params;

    const data = await this.getIncomesData(params);

    const document = incomesExcel(data, start, end);

    return {
      document,
    };
  }

  public async incomesByDisciplines(params: IncomeParams) {
    const data = await this.getIncomesData(params);
    // const groupedByMethod = groupIncomeByPaymentMethod(data);
    // const total = totalIncome(data);

    return {
      // groupedByMethod,
      // total,
      data,
    };
  }

  private async getIncomesData(params: IncomeParams): Promise<Array<any>> {
    const { start, end, branchId } = params;
    console.log('Params', params);

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
      'income.amount',
      'income.discount',
      'income.subtotal',
      'income.taxes',
      'income.total',
      'income.pendingPayment',
      'branch.id',
      'branch.name',
      'student.id',
      'student.fullname',
    ]);

    const response = await query.getMany();

    return response.map((payment) => ({
      paymentId: payment.id,
      paymentState: payment.state,
      paymentDate: payment.date.toISOString(),
      paymentAmount: `${payment.amount}`,
      incomeId: payment.income.id,
      incomeFolio: payment.income.folio,
      incomeState: payment.income.state,
      incomeDate: payment.income.date.toISOString(),
      incomeAmount: `${payment.income.amount}`,
      incomeDiscount: `${payment.income.discount}`,
      incomeSubtotal: `${payment.income.subtotal}`,
      incomeTaxes: `${payment.income.taxes}`,
      incomeTotal: `${payment.income.total}`,
      incomePendingPayment: `${payment.income.pendingPayment}`,
      branchId: payment.income.branch.id,
      branchName: payment.income.branch.name,
      withTax: payment.income.taxes > 0,
      students: payment.income.students.map((student) => ({
        id: student.id,
        fullname: student.fullname,
      })),
    }));
  }
}
