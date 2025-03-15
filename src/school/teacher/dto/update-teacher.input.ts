import { CreateTeacherInput } from './create-teacher.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateTeacher')
export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {}
