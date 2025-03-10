import { CreateStudentInput } from './create-student.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateStudent')
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
