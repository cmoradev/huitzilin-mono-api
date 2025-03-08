import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType('CreateUser')
export class CreateUserInput {
  @MaxLength(16)
  @Field(() => String, { nullable: false })
  username: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  password: string;
}
