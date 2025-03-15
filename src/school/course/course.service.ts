import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService extends TypeOrmQueryService<Course> {
  constructor(
    @InjectRepository(Course)
    private readonly _branchRepository: Repository<Course>,
  ) {
    super(_branchRepository, { useSoftDelete: true });
  }
}
