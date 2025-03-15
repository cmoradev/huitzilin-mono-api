import { CreateCycleInput } from './create-cycle.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateCycle')
export class UpdateCycleInput extends PartialType(CreateCycleInput) {}
