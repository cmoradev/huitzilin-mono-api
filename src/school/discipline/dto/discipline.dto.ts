import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';
import { LevelDto, PackageDto } from 'src/school';

@ObjectType('Discipline')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@FilterableUnPagedRelation('levels', () => LevelDto)
@FilterableUnPagedRelation('packages', () => PackageDto)
export class DisciplineDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => Int, { nullable: false })
  minHours: number;

  @FilterableField(() => ID, { nullable: false })
  branchId: string;
}
