import { Field, Float, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaymentMethod, PaymentState } from '../enum';

@InputType('CreatePayment')
export class CreatePaymentInput {
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

  @IsUUID()
  @Field(() => String, { nullable: false })
  incomeId: string;
}
