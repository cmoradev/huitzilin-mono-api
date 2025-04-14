import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { SetOrderActivityInput } from './dto/set-order-activity.input';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
@Injectable()
export class ActivityService extends TypeOrmQueryService<Activity> {
  constructor(
    @InjectRepository(Activity)
    private readonly _activityRepository: Repository<Activity>,
  ) {
    super(_activityRepository, { useSoftDelete: true });
  }

  public async setOrderActivities(
    params: SetOrderActivityInput[],
  ): Promise<UpdateCountResponse> {
    const values = params.map(
      (param) => ({ order: param.order, id: param.activityId }) as Activity,
    );

    const activities = await this._activityRepository.save(values);

    return {
      updatedCount: activities.length,
    };
  }
}
