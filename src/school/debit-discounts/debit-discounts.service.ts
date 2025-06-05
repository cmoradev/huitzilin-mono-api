import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { DebitDiscount } from './entities/debit-discount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DebitDiscountService extends TypeOrmQueryService<DebitDiscount> {
  constructor(
    @InjectRepository(DebitDiscount)
    private readonly _debitDiscountRepository: Repository<DebitDiscount>,
  ) {
    super(_debitDiscountRepository, { useSoftDelete: true });
  }
}
