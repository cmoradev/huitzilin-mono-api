import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { DiscountBy } from '../enums';

@InputType('CreateDiscount')
export class CreateDiscountInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Min(1)
  @Field(() => Float, { nullable: false })
  value: number;

  @Field(() => DiscountBy, { nullable: false })
  type: DiscountBy;

  @Field(() => ID, { nullable: false })
  branchId: string;
}
