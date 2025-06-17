import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';

@Injectable()
export class PeriodService extends TypeOrmQueryService<Period> {
  constructor(
    @InjectRepository(Period)
    private readonly _periodRepository: Repository<Period>,
  ) {
    super(_periodRepository, { useSoftDelete: true });
  }
}
