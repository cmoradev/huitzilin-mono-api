import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Discount } from './entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountService extends TypeOrmQueryService<Discount> {
  constructor(
    @InjectRepository(Discount)
    private readonly _discountRepository: Repository<Discount>,
  ) {
    super(_discountRepository, { useSoftDelete: true });
  }
}
