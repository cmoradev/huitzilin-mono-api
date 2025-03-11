import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';
import { EnrollmentState } from '../enums';

@ObjectType('Enrollment')
export class EnrollmentDto extends BaseDto {
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

  // student: Student;
  // course: Course;
  // cycle: Cycle;
  // classroom: Classroom;
}
