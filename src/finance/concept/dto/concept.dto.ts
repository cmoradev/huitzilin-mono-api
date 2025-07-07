import { Field, Float, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos';
import { DiscountDto } from 'src/miscellaneous';
import { DebitDto } from 'src/school';

@ObjectType('Concept')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('discounts', () => DiscountDto)
@UnPagedRelation('debits', () => DebitDto)
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

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  incomeId: string;
}
