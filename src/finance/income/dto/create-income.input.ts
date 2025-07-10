import { Field, InputType } from '@nestjs/graphql';
import { CreateConceptInput } from 'src/finance/concept/dto/create-concept.input';
import { CreatePaymentInput } from 'src/finance/payment/dto/create-payment.input';

@InputType('CreateIncome')
export class CreateIncomeInput {
  @Field(() => [CreateConceptInput], { nullable: true })
  concepts: CreateConceptInput[];

  @Field(() => [CreatePaymentInput], { nullable: true })
  payments: CreatePaymentInput[];
}
