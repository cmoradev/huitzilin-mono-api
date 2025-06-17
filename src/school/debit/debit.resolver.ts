import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DebitService } from './debit.service';
import { DebitDto } from './dto/debit.dto';

@Resolver(() => DebitDto)
export class DebitResolver {
  constructor(private readonly debitService: DebitService) {}

  @Mutation(() => DebitDto)
  restoreOneDebit(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<DebitDto> {
    return this.debitService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyDebits(
    @Args('input', { type: () => FilterType(DebitDto) })
    filter: Filter<DebitDto>,
  ): Promise<UpdateManyResponse> {
    return this.debitService.restoreMany(filter);
  }
}
