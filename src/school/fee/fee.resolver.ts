import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { FeeDto } from './dto/fee.dto';
import { FeeService } from './fee.service';

@Resolver(() => FeeDto)
export class FeeResolver {
  constructor(private readonly feeService: FeeService) {}

  @Mutation(() => FeeDto)
  restoreOneFee(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<FeeDto> {
    return this.feeService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyFees(
    @Args('input', { type: () => FilterType(FeeDto) })
    filter: Filter<FeeDto>,
  ): Promise<UpdateManyResponse> {
    return this.feeService.restoreMany(filter);
  }
}
