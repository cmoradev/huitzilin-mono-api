import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Tutor } from './entities/tutor.entity';

@Injectable()
export class TutorService extends TypeOrmQueryService<Tutor> {
  constructor(
    @InjectRepository(Tutor)
    private readonly _tutorRepository: Repository<Tutor>,
  ) {
    super(_tutorRepository, { useSoftDelete: true });
  }
}
