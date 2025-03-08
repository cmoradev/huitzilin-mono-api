import { CreateFeeInput } from './create-fee.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateFee')
export class UpdateFeeInput extends PartialType(CreateFeeInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
