import { CreateClipAccountInput } from './create-clip-account.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateClipAccount')
export class UpdateClipAccountInput extends PartialType(
  CreateClipAccountInput,
) {}
