import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { LevelDto } from './dto/level.dto';
import { LevelService } from './level.service';
import { SetOrderInput, UpdateCountResponse } from 'src/common/dtos';

@Resolver(() => LevelDto)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Mutation(() => UpdateCountResponse)
  setOrderEnrollments(
    @Args('input', { type: () => [SetOrderInput] })
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    return this.levelService.setOrderLevels(params);
  }

  @Mutation(() => LevelDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<LevelDto> {
    return this.levelService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(LevelDto) })
    filter: Filter<LevelDto>,
  ): Promise<UpdateManyResponse> {
    return this.levelService.restoreMany(filter);
  }
}
