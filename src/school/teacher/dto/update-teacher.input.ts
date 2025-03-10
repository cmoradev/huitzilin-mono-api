import { CreateTeacherInput } from './create-teacher.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateTeacher')
export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
