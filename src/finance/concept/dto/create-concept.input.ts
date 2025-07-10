import { Field, Float, InputType } from '@nestjs/graphql';
import { NestedIdInput } from 'src/common/dtos';
import { Debit } from 'src/school';

@InputType('CreateConcept')
export class CreateConceptInput {
  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  unitPrice: number;

  @Field(() => Float, { nullable: false })
  quantity: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @Field(() => String, { nullable: false })
  debitId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  discounts: NestedIdInput[];
}

export class CreateConceptInputWithDebit {
  description: string;
  unitPrice: number;
  quantity: number;
  withTax: boolean;
  debitId: string;
  debit: Debit;
  discounts: NestedIdInput[];
}
