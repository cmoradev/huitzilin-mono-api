import { InputType, PartialType } from '@nestjs/graphql';
import { CreateActionInput } from './create-action.input';

@InputType('UpdateAction')
export class UpdateActionInput extends PartialType(CreateActionInput) {}
