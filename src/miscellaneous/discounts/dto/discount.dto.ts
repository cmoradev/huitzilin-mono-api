import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { DiscountBy } from '../enums';

@ObjectType('Discount')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class DiscountDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  value: number;

  @Field(() => DiscountBy, { nullable: false })
  type: DiscountBy;

  @FilterableField(() => ID, { nullable: false })
  branchId: string;
}
