import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';
import { PaymentMethod, PaymentState } from '../enum';

@ObjectType('Payment')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class PaymentDto extends BaseDto {
  @FilterableField(() => Int, { nullable: false })
  folio: number;

  @Field(() => PaymentState, { nullable: false })
  state: PaymentState;

  @Field(() => PaymentMethod, { nullable: false })
  method: PaymentMethod;

  @Field(() => GraphQLISODateTime, { nullable: false })
  date: Date;

  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => String, { nullable: false })
  transaction: string;

  @Field(() => String, { nullable: false })
  bank: string;

  @FilterableField(() => String, { nullable: false })
  incomeId: string;
}
