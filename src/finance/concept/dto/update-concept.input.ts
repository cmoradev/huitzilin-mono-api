import { CreateConceptInput } from './create-concept.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateConcept')
export class UpdateConceptInput extends PartialType(CreateConceptInput) {}
