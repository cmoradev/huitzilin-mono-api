import { CreatePaymentInput } from './create-payment.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdatePayment')
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {}
