import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DebitDiscountService } from './debit-discounts.service';
import { DebitDiscountDto } from './dto';

@Resolver(() => DebitDiscountDto)
export class DebitDiscountResolver {
  constructor(private readonly _debitDiscountService: DebitDiscountService) {}

  @Mutation(() => DebitDiscountDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<DebitDiscountDto> {
    return this._debitDiscountService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(DebitDiscountDto) })
    filter: Filter<DebitDiscountDto>,
  ): Promise<UpdateManyResponse> {
    return this._debitDiscountService.restoreMany(filter);
  }
}
