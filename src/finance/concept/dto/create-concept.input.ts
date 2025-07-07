import { Field, Float, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateConcept')
export class CreateConceptInput {
  @Field(() => String, { nullable: false })
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

  @IsUUID()
  @Field(() => String, { nullable: false })
  incomeId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  discounts: NestedIdInput[];

  @Field(() => [NestedIdInput], { nullable: true })
  debits: NestedIdInput[];
}
