import { CreateUserInput } from './create-user.input';
import { InputType, Field, OmitType, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateUser')
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password']),
) {
  @Field(() => ID, { nullable: false })
  id: string;
}
