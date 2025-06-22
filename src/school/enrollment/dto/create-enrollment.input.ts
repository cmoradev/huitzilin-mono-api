import { Field, InputType, Int } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { EnrollmentState } from '../enums';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateEnrollment')
export class CreateEnrollmentInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @Field(() => Number, { nullable: false })
  order: number;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @Field(() => Int, { nullable: false })
  hours: number;

  @Field(() => Int, { nullable: false })
  diciplines: number;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  studentId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  packageId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  cycleId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  levelId: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  periodId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  schedules?: NestedIdInput[];
}
