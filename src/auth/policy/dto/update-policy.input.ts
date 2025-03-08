import { CreatePolicyInput } from './create-policy.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePolicyInput extends PartialType(CreatePolicyInput) {
  @Field(() => Int)
  id: number;
}
