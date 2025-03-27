import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Cycle')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class CycleDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  start: Date;

  @Field(() => Date, { nullable: false })
  end: Date;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
