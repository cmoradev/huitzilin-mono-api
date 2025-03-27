import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { EnrollmentState } from '../enums';

@ObjectType('Enrollment')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
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
