import { CreateEnrollmentInput } from './create-enrollment.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType('UpdateEnrollment')
export class UpdateEnrollmentInput extends PartialType(CreateEnrollmentInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
