import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { ActionDto } from 'src/auth';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Policy')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('actions', () => ActionDto, {
  pagingStrategy: PagingStrategies.NONE,
})
export class PolicyDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;
}
