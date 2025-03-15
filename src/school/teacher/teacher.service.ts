import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService extends TypeOrmQueryService<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private readonly _teacherRepository: Repository<Teacher>,
  ) {
    super(_teacherRepository, { useSoftDelete: true });
  }
}
