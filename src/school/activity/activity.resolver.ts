import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';

@Resolver(() => ActivityDto)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => ActivityDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<ActivityDto> {
    return this.activityService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(ActivityDto) })
    filter: Filter<ActivityDto>,
  ): Promise<UpdateManyResponse> {
    return this.activityService.restoreMany(filter);
  }
}
