import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreatePaymentInput } from 'src/finance/payment/dto/create-payment.input';

@InputType('AddPayment')
export class AddPaymentInput {
  @IsUUID()
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => [CreatePaymentInput], { nullable: true })
  payments: CreatePaymentInput[];
}
