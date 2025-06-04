import { CreateDiscountInput } from './create-discount.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDiscount')
export class UpdateDiscountInput extends PartialType(CreateDiscountInput) {}
