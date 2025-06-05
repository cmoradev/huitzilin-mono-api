import { CreateDebitDiscountInput } from './create-debit-discount.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDebitDiscount')
export class UpdateDebitDiscountInput extends PartialType(
  CreateDebitDiscountInput,
) {}
