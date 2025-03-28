import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { CycleService } from './cycle.service';
import { CycleDto } from './dto/cycle.dto';

@Resolver(() => CycleDto)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Mutation(() => CycleDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<CycleDto> {
    return this.cycleService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(CycleDto) })
    filter: Filter<CycleDto>,
  ): Promise<UpdateManyResponse> {
    return this.cycleService.restoreMany(filter);
  }
}
