import { InputType, PartialType } from '@nestjs/graphql';
import { CreateActivityInput } from './create-activity.input';

@InputType('UpdateActivity')
export class UpdateActivityInput extends PartialType(CreateActivityInput) {}
