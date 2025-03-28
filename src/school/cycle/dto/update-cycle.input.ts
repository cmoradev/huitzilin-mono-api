import { CreateCycleInput } from './create-cycle.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateCycle')
export class UpdateCycleInput extends PartialType(CreateCycleInput) {}
