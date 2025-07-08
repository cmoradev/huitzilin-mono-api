import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { ClipAccount } from './entities/clip-account.entity';
import { ClipAccountDto } from './dto/clip-account.dto';
import { ClipAccountsService } from './clip-accounts.service';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DiscountDto } from '../discounts/dto';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';

@Resolver(() => ClipAccount)
export class ClipAccountsResolver {
  constructor(private readonly _discountService: ClipAccountsService) {}

  @Mutation(() => ClipAccountDto)
  restoreOneClipAccount(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<ClipAccountDto> {
    return this._discountService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyClipAccounts(
    @Args('input', { type: () => FilterType(DiscountDto) })
    filter: Filter<DiscountDto>,
  ): Promise<UpdateManyResponse> {
    return this._discountService.restoreMany(filter);
  }
}
