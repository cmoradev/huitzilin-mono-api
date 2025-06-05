import { CreateDebitDiscountInput } from './create-debit-discount.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDiscount')
export class UpdateDiscountInput extends PartialType(
  CreateDebitDiscountInput,
) {}
