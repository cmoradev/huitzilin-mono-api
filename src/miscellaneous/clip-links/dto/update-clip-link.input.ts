import { CreateClipLinkInput } from './create-clip-link.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateClipLink')
export class UpdateClipLinkInput extends PartialType(CreateClipLinkInput) {}
