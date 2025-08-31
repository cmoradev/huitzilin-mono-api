import { Field, Float, InputType } from '@nestjs/graphql';
import { NestedIdInput } from 'src/common/dtos';
import { Debit } from 'src/school';
import { ConceptApplication } from '../enum';

@InputType('CreateConcept')
export class CreateConceptInput {
  @Field(() => String, { nullable: false })
  branchID: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  unitPrice: number;

  @Field(() => Float, { nullable: false })
  quantity: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @Field(() => String, { nullable: true })
  debitId: string | null;

  @Field(() => ConceptApplication, { nullable: false })
  application: ConceptApplication;

  @Field(() => [NestedIdInput], { nullable: true })
  discounts: NestedIdInput[];
}

export class CreateConceptInputWithDebit {
  branchID: string;
  description: string;
  unitPrice: number;
  quantity: number;
  withTax: boolean;
  application: ConceptApplication;
  debitId: string | null;
  debit: Debit | null;
  discounts: NestedIdInput[];
}
