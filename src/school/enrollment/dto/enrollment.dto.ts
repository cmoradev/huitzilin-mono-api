import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { EnrollmentState } from '../enums';
import { BranchDto } from 'src/auth';
import {
  StudentDto,
  CycleDto,
  PackageDto,
  LevelDto,
  ScheduleDto,
  PeriodDto,
} from 'src/school';

@ObjectType('Enrollment')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@Relation('branch', () => BranchDto, { nullable: true })
@Relation('student', () => StudentDto, { nullable: true })
@Relation('packageId', () => PackageDto, { nullable: true })
@Relation('cycle', () => CycleDto, { nullable: true })
@Relation('level', () => LevelDto, { nullable: true })
@Relation('package', () => PackageDto, { nullable: true })
@Relation('period', () => PeriodDto, { nullable: true })
@FilterableUnPagedRelation('schedules', () => ScheduleDto)
export class EnrollmentDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  details: string;

  @FilterableField(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @FilterableField(() => Number, { nullable: false })
  hours: number;

  @FilterableField(() => Number, { nullable: false })
  diciplines: number;

  @FilterableField(() => ID, { nullable: false })
  branchId: string;

  @FilterableField(() => ID, { nullable: false })
  studentId: string;

  @FilterableField(() => ID, { nullable: false })
  packageId: string;

  @FilterableField(() => ID, { nullable: false })
  cycleId: string;

  @FilterableField(() => ID, { nullable: false })
  levelId: string;
}
