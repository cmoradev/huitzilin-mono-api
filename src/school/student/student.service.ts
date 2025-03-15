import { Injectable } from '@nestjs/common';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Student } from '..';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService extends TypeOrmQueryService<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly _studentRepository: Repository<Student>,
  ) {
    super(_studentRepository, { useSoftDelete: true });
  }
}
