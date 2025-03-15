import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFeeInput } from './create-fee.input';

@InputType('UpdateFee')
export class UpdateFeeInput extends PartialType(CreateFeeInput) {}
