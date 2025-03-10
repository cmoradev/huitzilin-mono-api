import { CreateTutorInput } from './create-tutor.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateTutor')
export class UpdateTutorInput extends PartialType(CreateTutorInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
