import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType('CreatePolicy')
export class CreatePolicyInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;
}
