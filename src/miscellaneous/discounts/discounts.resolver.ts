import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DiscountService } from './discounts.service';
import { DiscountDto } from './dto';

@Resolver(() => DiscountDto)
export class DiscountResolver {
  constructor(private readonly _discountService: DiscountService) {}

  @Mutation(() => DiscountDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<DiscountDto> {
    return this._discountService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(DiscountDto) })
    filter: Filter<DiscountDto>,
  ): Promise<UpdateManyResponse> {
    return this._discountService.restoreMany(filter);
  }
}
