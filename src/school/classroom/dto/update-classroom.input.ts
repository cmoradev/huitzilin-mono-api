import { CreateClassroomInput } from './create-classroom.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateClassroom')
export class UpdateClassroomInput extends PartialType(CreateClassroomInput) {}
