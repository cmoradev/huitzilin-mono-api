import { Field, Float, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableRelation,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos';
import { DiscountDto } from 'src/miscellaneous';
import { DebitDto } from 'src/school';
import { ConceptApplication } from '../enum';
import { IncomeDto } from 'src/finance/income/dto';

@ObjectType('Concept')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('discounts', () => DiscountDto)
@UnPagedRelation('debits', () => DebitDto)
@FilterableRelation('income', () => IncomeDto)
export class ConceptDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  unitPrice: number;

  @Field(() => Float, { nullable: false })
  quantity: number;

  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => Float, { nullable: false })
  discount: number;

  @Field(() => Float, { nullable: false })
  subtotal: number;

  @Field(() => Float, { nullable: false })
  taxes: number;

  @Field(() => Float, { nullable: false })
  total: number;

  @FilterableField(() => Float, { nullable: false })
  pendingPayment: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  incomeId: string;

  @FilterableField(() => ConceptApplication, { nullable: false })
  application: ConceptApplication;
}
