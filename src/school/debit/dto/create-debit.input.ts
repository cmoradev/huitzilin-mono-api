import { InputType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { DebitState } from '../enums';
import { Frequency } from 'src/school/fee/enums';
import { IsUUID } from 'class-validator';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateDebit')
export class CreateDebitInput {
  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  unitPrice: number;

  @Field(() => Float, { nullable: false })
  quantity: number;

  @Field(() => Float, { nullable: false })
  discount: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @Field(() => Boolean, { nullable: false })
  withPayment: boolean;

  @Field(() => DebitState, { nullable: false })
  state: DebitState;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @Field(() => String, { nullable: false })
  dueDate: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate: Date;

  @IsUUID()
  @Field(() => String, { nullable: false })
  studentId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  enrollmentId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  discounts?: NestedIdInput[];
}
