import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { EnrollmentState } from '../enums';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('Enrollment')
export class EnrollmentDto extends BaseDto {
  @Field(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @FilterableField(() => String, { nullable: false })
  branchId: string;

  @FilterableField(() => String, { nullable: false })
  studentId: string;

  @FilterableField(() => String, { nullable: false })
  courseId: string;

  @FilterableField(() => String, { nullable: false })
  cycleId: string;

  @FilterableField(() => String, { nullable: false })
  classroomId: string;
}
