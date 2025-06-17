import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Resolver(() => ScheduleDto)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation(() => ScheduleDto)
  restoreOneSchedule(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<ScheduleDto> {
    return this.scheduleService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManySchedules(
    @Args('input', { type: () => FilterType(ScheduleDto) })
    filter: Filter<ScheduleDto>,
  ): Promise<UpdateManyResponse> {
    return this.scheduleService.restoreMany(filter);
  }
}
