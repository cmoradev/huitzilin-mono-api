import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType('SignInInput')
export class SignInInput {
  @MaxLength(16)
  @Field(() => String, { nullable: false })
  username: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  password: string;
}
