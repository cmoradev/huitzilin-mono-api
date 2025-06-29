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
@Relation('branch', () => BranchDto, { nullable: false })
@Relation('student', () => StudentDto, { nullable: false })
@Relation('packageId', () => PackageDto, { nullable: false })
@Relation('cycle', () => CycleDto, { nullable: false })
@Relation('level', () => LevelDto, { nullable: false })
@Relation('package', () => PackageDto, { nullable: false })
@Relation('period', () => PeriodDto, { nullable: false })
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
