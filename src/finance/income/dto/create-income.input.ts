import { Field, InputType } from '@nestjs/graphql';
import { CreateConceptInput } from 'src/finance/concept/dto/create-concept.input';
import { CreatePaymentInput } from 'src/finance/payment/dto/create-payment.input';

@InputType('CreateIncome')
export class CreateIncomeInput {
  @Field(() => [String], { nullable: false })
  studentIDs: string[];

  @Field(() => [CreateConceptInput], { nullable: false })
  concepts: CreateConceptInput[];

  @Field(() => [CreatePaymentInput], { nullable: false })
  payments: CreatePaymentInput[];
}

@InputType('CreateLinkIncome')
export class CreateLinkIncomeInput {
  @Field(() => [String], { nullable: false })
  studentIDs: string[];

  @Field(() => [CreateConceptInput], { nullable: false })
  concepts: CreateConceptInput[];
}
