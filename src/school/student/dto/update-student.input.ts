import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';

@InputType('UpdateStudent')
export class UpdateStudentInput extends PartialType(CreateStudentInput) {}
