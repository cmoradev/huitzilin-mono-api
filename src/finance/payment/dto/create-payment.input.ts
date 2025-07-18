import { Field, Float, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { PaymentMethod } from '../enum';

@InputType('CreatePayment')
export class CreatePaymentInput {
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
}
