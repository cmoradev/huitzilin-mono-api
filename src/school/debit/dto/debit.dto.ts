import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';
import { DiscountDto } from 'src/miscellaneous';
import { Frequency } from 'src/school/fee/enums';
import { DebitState } from '../enums';

@ObjectType('Debit')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('discounts', () => DiscountDto)
export class DebitDto extends BaseDto {
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

  @Field(() => Boolean, { nullable: false })
  withPayment: boolean;

  @FilterableField(() => DebitState, { nullable: false })
  state: DebitState;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @FilterableField(() => String, { nullable: false })
  dueDate: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate: Date | null;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  studentId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  enrollmentId: string;
}
