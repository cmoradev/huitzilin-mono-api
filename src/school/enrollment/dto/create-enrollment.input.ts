import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { EnrollmentState } from '../enums';

@InputType('CreateEnrollment')
export class CreateEnrollmentInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;
  
  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  studentId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  courseId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  cycleId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  classroomId: string;
}
