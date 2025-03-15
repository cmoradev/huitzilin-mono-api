import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService extends TypeOrmQueryService<Classroom> {
  constructor(
    @InjectRepository(Classroom)
    private readonly _classroomRepository: Repository<Classroom>,
  ) {
    super(_classroomRepository, { useSoftDelete: true });
  }
}
