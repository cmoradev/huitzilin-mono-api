import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './entities/cycle.entity';

@Injectable()
export class CycleService extends TypeOrmQueryService<Cycle> {
  constructor(
    @InjectRepository(Cycle)
    private readonly _cycleRepository: Repository<Cycle>,
  ) {
    super(_cycleRepository, { useSoftDelete: true });
  }
}
