import { CreateDisciplineInput } from './create-discipline.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDiscipline')
export class UpdateDisciplineInput extends PartialType(CreateDisciplineInput) {}
