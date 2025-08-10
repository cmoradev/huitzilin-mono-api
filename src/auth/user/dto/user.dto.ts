import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { PolicyDto } from 'src/auth';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('User')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('policies', () => PolicyDto, {
  pagingStrategy: PagingStrategies.NONE,
})
export class UserDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  username: string;

  @FilterableField(() => String, { nullable: false })
  email: string;

  @FilterableField(() => String, { nullable: false })
  branchId: string;

  @FilterableField(() => String, { nullable: false })
  cycleId: string;
}
