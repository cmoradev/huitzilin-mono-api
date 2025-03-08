import { CreateClassroomInput } from './create-classroom.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateClassroom')
export class UpdateClassroomInput extends PartialType(CreateClassroomInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
