import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { EnrollmentState } from '../enums';

@InputType('CreateEnrollment')
export class CreateEnrollmentInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @Field(() => Number, { nullable: false })
  order: number;

  @Field(() => Boolean, { nullable: false })
  isPackage: boolean;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  studentId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  activityId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  cycleId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  levelId: string;

  @IsUUID()
  @Field(() => ID, { nullable: true })
  parentId: string | null;
}
