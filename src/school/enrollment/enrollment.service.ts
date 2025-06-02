import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { SetOrderEnrollmentInput } from './dto/set-order-enrollment.input';

@Injectable()
export class EnrollmentService extends TypeOrmQueryService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment)
    private readonly _enrollmentRepository: Repository<Enrollment>,
  ) {
    super(_enrollmentRepository, { useSoftDelete: true });
  }

  public async setOrderEnrollments(
    params: SetOrderEnrollmentInput[],
  ): Promise<UpdateCountResponse> {
    const values = params.map(
      (param) => ({ order: param.order, id: param.enrollmentId }) as Enrollment,
    );

    const activities = await this._enrollmentRepository.save(values);

    return {
      updatedCount: activities.length,
    };
  }
}
