import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/finance';
import { Repository } from 'typeorm';
import { IncomeParams } from './dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Payment)
    private readonly _paymentRepository: Repository<Payment>,
  ) {}

  public async incomes(params: IncomeParams) {
    const { start, end } = params;

    const query = this._paymentRepository.createQueryBuilder('payment');

    query.where('payment.date BETWEEN :start AND :end', { start, end });
    query.orderBy('payment.date', 'ASC');
    query.select([
      'payment.id',
      'payment.folio',
      'payment.state',
      'payment.method',
      'payment.date',
      'payment.amount',
      'payment.transaction',
      'payment.bank',
    ]);
    // Logic to retrieve income reports
    return query.getMany();
  }
}
