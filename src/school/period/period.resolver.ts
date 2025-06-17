import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { PeriodDto } from './dto/period.dto';
import { PeriodService } from './period.service';

@Resolver(() => PeriodDto)
export class PeriodResolver {
  constructor(private readonly periodService: PeriodService) {}

  @Mutation(() => PeriodDto)
  restoreOnePeriod(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<PeriodDto> {
    return this.periodService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPeriods(
    @Args('input', { type: () => FilterType(PeriodDto) })
    filter: Filter<PeriodDto>,
  ): Promise<UpdateManyResponse> {
    return this.periodService.restoreMany(filter);
  }
}
