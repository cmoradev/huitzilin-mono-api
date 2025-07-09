import { Field, Float, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from '../enums';

@ObjectType('Fee')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class FeeDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => Float, { nullable: false })
  taxes: number;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @FilterableField(() => Boolean, { nullable: false })
  autoLoad: boolean;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @FilterableField(() => String, { nullable: false })
  packageId: string;
}
