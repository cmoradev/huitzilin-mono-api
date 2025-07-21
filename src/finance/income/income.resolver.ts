import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { IncomeDto } from './dto/income.dto';
import { IncomeService } from './income.service';
import {
  CreateIncomeInput,
  CreateLinkIncomeInput,
} from './dto/create-income.input';

@Resolver(() => IncomeDto)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) {}

  @Mutation(() => [IncomeDto])
  createLinkIncomes(
    @Args('input', { type: () => CreateLinkIncomeInput })
    params: CreateLinkIncomeInput,
  ): Promise<IncomeDto[]> {
    return this.incomeService.createLinkIncomes(params);
  }

  @Mutation(() => [IncomeDto])
  createIncomes(
    @Args('input', { type: () => CreateIncomeInput })
    params: CreateIncomeInput,
  ): Promise<IncomeDto[]> {
    return this.incomeService.createIncomes(params);
  }

  @Mutation(() => IncomeDto)
  restoreOneIncome(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<IncomeDto> {
    return this.incomeService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyIncomes(
    @Args('input', { type: () => FilterType(IncomeDto) })
    filter: Filter<IncomeDto>,
  ): Promise<UpdateManyResponse> {
    return this.incomeService.restoreMany(filter);
  }
}
