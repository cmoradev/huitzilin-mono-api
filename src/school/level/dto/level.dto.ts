import { Int, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Level')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class LevelDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  abbreviation: string;

  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => Int, { nullable: false })
  order: number;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
