import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService extends TypeOrmQueryService<Schedule> {
  constructor(
    @InjectRepository(Schedule)
    private readonly _scheduleRepository: Repository<Schedule>,
  ) {
    super(_scheduleRepository, { useSoftDelete: true });
  }
}
