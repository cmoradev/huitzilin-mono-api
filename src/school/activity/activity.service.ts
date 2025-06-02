import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { SetOrderInput } from 'src/common/dtos';
@Injectable()
export class ActivityService extends TypeOrmQueryService<Activity> {
  constructor(
    @InjectRepository(Activity)
    private readonly _activityRepository: Repository<Activity>,
  ) {
    super(_activityRepository, { useSoftDelete: true });
  }

  public async setOrderActivities(
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    const activities = await this._activityRepository.save(params);

    return {
      updatedCount: activities.length,
    };
  }
}
