import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { EnrollmentState } from '../enums';
import { BranchDto } from 'src/auth';
import { StudentDto, CycleDto, ActivityDto, LevelDto } from 'src/school';

@ObjectType('Enrollment')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@Relation('branch', () => BranchDto, { nullable: false })
@Relation('student', () => StudentDto, { nullable: false })
@Relation('activity', () => ActivityDto, { nullable: false })
@Relation('cycle', () => CycleDto, { nullable: false })
@Relation('level', () => LevelDto, { nullable: false })
@Relation('parent', () => EnrollmentDto, { nullable: true })
@UnPagedRelation('children', () => EnrollmentDto, {
  nullable: false,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 50,
})
export class EnrollmentDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @FilterableField(() => Boolean, { nullable: false })
  isPackage: boolean;

  @FilterableField(() => ID, { nullable: false })
  branchId: string;

  @FilterableField(() => ID, { nullable: false })
  studentId: string;

  @FilterableField(() => ID, { nullable: false })
  activityId: string;

  @FilterableField(() => ID, { nullable: false })
  cycleId: string;

  @FilterableField(() => ID, { nullable: false })
  levelId: string;

  @FilterableField(() => ID, { nullable: true })
  parentId: string | null;
}
