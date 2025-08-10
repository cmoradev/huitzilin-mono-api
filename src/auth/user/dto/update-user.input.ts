import { NestedIdInput } from 'src/common/dtos';
import { SignUpInput } from './sign-up.input';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType('UpdateUser')
export class UpdateUserInput extends PartialType(
  OmitType(SignUpInput, ['password']),
) {
  @Field(() => [NestedIdInput], { nullable: true })
  policies: NestedIdInput[];
}
