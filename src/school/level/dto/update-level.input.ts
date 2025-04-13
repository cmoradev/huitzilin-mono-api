import { CreateLevelInput } from './create-level.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateLevel')
export class UpdateLevelInput extends PartialType(CreateLevelInput) {}
