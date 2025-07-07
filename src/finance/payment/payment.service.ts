import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService extends TypeOrmQueryService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly _paymentRepository: Repository<Payment>,
  ) {
    super(_paymentRepository, { useSoftDelete: true });
  }
}
