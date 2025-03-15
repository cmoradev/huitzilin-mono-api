import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';

@Injectable()
export class FeeService extends TypeOrmQueryService<Fee> {
  constructor(
    @InjectRepository(Fee)
    private readonly _feeRepository: Repository<Fee>,
  ) {
    super(_feeRepository, { useSoftDelete: true });
  }
}
