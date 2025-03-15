import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CycleService } from './cycle.service';
import { CreateCycleInput } from './dto/create-cycle.input';
import { UpdateCycleInput } from './dto/update-cycle.input';
import { CycleDto } from './dto/cycle.dto';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';

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
