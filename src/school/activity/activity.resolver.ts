import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { SetOrderInput } from 'src/common/dtos';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';

@Resolver(() => ActivityDto)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => UpdateCountResponse)
  setOrderActivities(
    @Args('input', { type: () => [SetOrderInput] })
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    return this.activityService.setOrderActivities(params);
  }

  @Mutation(() => ActivityDto)
  restoreOneActivity(
    @Args('input', { type: () => ID }) id: string,
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
