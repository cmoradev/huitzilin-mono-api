import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { SetOrderActivityInput } from './dto/set-order-activity.input';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';

@Resolver(() => ActivityDto)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => UpdateCountResponse)
  setOrderActivities(
    @Args('input', { type: () => [SetOrderActivityInput] })
    params: SetOrderActivityInput[],
  ): Promise<UpdateCountResponse> {
    return this.activityService.setOrderActivities(params);
  }

  @Mutation(() => ActivityDto)
  restoreOneActivity(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<ActivityDto> {
    return this.activityService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyActivities(
    @Args('input', { type: () => FilterType(ActivityDto) })
    filter: Filter<ActivityDto>,
  ): Promise<UpdateManyResponse> {
    return this.activityService.restoreMany(filter);
  }
}
