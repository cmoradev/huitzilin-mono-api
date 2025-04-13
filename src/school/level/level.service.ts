import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelService extends TypeOrmQueryService<Level> {
  constructor(
    @InjectRepository(Level)
    private readonly _levelRepository: Repository<Level>,
  ) {
    super(_levelRepository, { useSoftDelete: true });
  }
}
