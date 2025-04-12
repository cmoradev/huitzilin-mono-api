import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService extends TypeOrmQueryService<Activity> {
  constructor(
    @InjectRepository(Activity)
    private readonly _activityRepository: Repository<Activity>,
  ) {
    super(_activityRepository, { useSoftDelete: true });
  }
}
