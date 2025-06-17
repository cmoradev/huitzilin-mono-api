import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './entities/discipline.entity';

@Injectable()
export class DisciplineService extends TypeOrmQueryService<Discipline> {
  constructor(
    @InjectRepository(Discipline)
    private readonly _disciplineRepository: Repository<Discipline>,
  ) {
    super(_disciplineRepository, { useSoftDelete: true });
  }
}
