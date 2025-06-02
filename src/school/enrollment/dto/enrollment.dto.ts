import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { EnrollmentState } from '../enums';
import { BranchDto } from 'src/auth';
import {
  StudentDto,
  CycleDto,
  ActivityDto,
  ClassroomDto,
  LevelDto,
} from 'src/school';

@ObjectType('Enrollment')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@Relation('branch', () => BranchDto, { nullable: false })
@Relation('student', () => StudentDto, { nullable: false })
@Relation('activity', () => ActivityDto, { nullable: false })
@Relation('cycle', () => CycleDto, { nullable: false })
@Relation('classroom', () => ClassroomDto, { nullable: false })
@Relation('level', () => LevelDto, { nullable: false })
export class EnrollmentDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  details: string;

  @Field(() => EnrollmentState, { nullable: false })
  state: EnrollmentState;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @FilterableField(() => Boolean, { nullable: false })
  isPackage: boolean;

  @FilterableField(() => Boolean, { nullable: false })
  inPackage: boolean;

  @FilterableField(() => String, { nullable: false })
  branchId: string;

  @FilterableField(() => String, { nullable: false })
  studentId: string;

  @FilterableField(() => String, { nullable: false })
  activityId: string;

  @FilterableField(() => String, { nullable: false })
  cycleId: string;

  @FilterableField(() => String, { nullable: false })
  classroomId: string;

  @FilterableField(() => String, { nullable: false })
  levelId: string;

  @FilterableField(() => Number, { nullable: true })
  parentId: number | null;
}
