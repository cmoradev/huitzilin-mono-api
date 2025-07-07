import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService extends TypeOrmQueryService<Income> {
  constructor(
    @InjectRepository(Income)
    private readonly _incomeRepository: Repository<Income>,
  ) {
    super(_incomeRepository, { useSoftDelete: true });
  }
}
