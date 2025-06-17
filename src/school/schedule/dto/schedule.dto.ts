import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';

@ObjectType('Schedule')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
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
}
