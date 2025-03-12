import { CreateDealInput } from './create-deal.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDealInput extends PartialType(CreateDealInput) {
  @Field(() => Int)
  id: number;
}
