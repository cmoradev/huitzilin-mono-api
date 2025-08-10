import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Action')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class ActionDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  resources: string;

  @FilterableField(() => String, { nullable: false })
  route: string;

  @FilterableField(() => [String], { nullable: false })
  actions: string[];

  @FilterableField(() => String, { nullable: false })
  policyId: string;
}
