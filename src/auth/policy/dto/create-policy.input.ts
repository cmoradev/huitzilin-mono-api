import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CreateActionInput } from 'src/auth/action/dto/create-action.input';

@InputType('CreatePolicy')
export class CreatePolicyInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => [CreateActionInput], { nullable: false })
  actions: CreateActionInput[];
}
