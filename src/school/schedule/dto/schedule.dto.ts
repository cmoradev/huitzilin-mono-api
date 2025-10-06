import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { BranchDto } from 'src/auth';
import { BaseDto } from 'src/common/dtos';
import {
  DisciplineDto,
  EnrollmentDto,
  LevelDto,
  PeriodDto,
  TeacherDto,
} from 'src/school';

@ObjectType('Schedule')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@Relation('branch', () => BranchDto, {
  nullable: true,
  withDeleted: true,
})
@Relation('period', () => PeriodDto, {
  nullable: true,
  withDeleted: true,
})
@Relation('discipline', () => DisciplineDto, {
  nullable: true,
  withDeleted: true,
})
@Relation('teacher', () => TeacherDto, { nullable: true })
@FilterableUnPagedRelation('levels', () => LevelDto, {
  nullable: true,
  withDeleted: true,
})
@FilterableUnPagedRelation('enrollments', () => EnrollmentDto, {
  nullable: false,
  withDeleted: true,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 50,
})
export class ScheduleDto extends BaseDto {
  @FilterableField(() => Int, { nullable: false })
  day: number;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @FilterableField(() => ID, { nullable: false })
  branchId: string;

  @FilterableField(() => ID, { nullable: false })
  periodId: string;

  @FilterableField(() => ID, { nullable: false })
  disciplineId: string;

  @FilterableField(() => ID, { nullable: true })
  teacherId: string;
}
