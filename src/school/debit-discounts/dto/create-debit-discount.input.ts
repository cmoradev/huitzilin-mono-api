import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { DiscountBy } from 'src/miscellaneous/discounts/enums';

@InputType('CreateDebitDiscount')
export class CreateDebitDiscountInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Min(1)
  @Field(() => Float, { nullable: false })
  value: number;

  @Field(() => DiscountBy, { nullable: false })
  type: DiscountBy;

  @Field(() => ID, { nullable: false })
  debitId: string;
}
