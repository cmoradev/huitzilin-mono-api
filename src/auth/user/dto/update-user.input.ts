import { SignUpInput } from './sign-up.input';
import { InputType, Field, OmitType, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateUser')
export class UpdateUserInput extends PartialType(
  OmitType(SignUpInput, ['password']),
) {}
