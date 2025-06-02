import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { SetOrderInput } from 'src/common/dtos';

@Injectable()
export class EnrollmentService extends TypeOrmQueryService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment)
    private readonly _enrollmentRepository: Repository<Enrollment>,
  ) {
    super(_enrollmentRepository, { useSoftDelete: true });
  }

  public async setOrderEnrollments(
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    const enrollment = await this._enrollmentRepository.save(params);

    return {
      updatedCount: enrollment.length,
    };
  }
}
