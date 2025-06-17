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
  restoreOneCycle(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<CycleDto> {
    return this.cycleService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyCycles(
    @Args('input', { type: () => FilterType(CycleDto) })
    filter: Filter<CycleDto>,
  ): Promise<UpdateManyResponse> {
    return this.cycleService.restoreMany(filter);
  }
}
