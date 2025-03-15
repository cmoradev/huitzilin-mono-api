import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService extends TypeOrmQueryService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment)
    private readonly _enrollmentRepository: Repository<Enrollment>,
  ) {
    super(_enrollmentRepository, { useSoftDelete: true });
  }
}
