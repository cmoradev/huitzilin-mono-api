import { CreateDocumentInput } from './create-document.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDocument')
export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {}
