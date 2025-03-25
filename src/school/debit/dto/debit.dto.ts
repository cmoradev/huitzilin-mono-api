import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from 'src/school/fee/enums';
import { DebitState } from '../enums';

@ObjectType('Debit')
@QueryOptions({ defaultSort: [{ field: 'id', direction: SortDirection.DESC }] })
export class DebitDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  value: number;

  @Field(() => DebitState, { nullable: false })
  state: DebitState;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @Field(() => Date, { nullable: false })
  dueDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate: Date;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  enrollmentId: string;
}
