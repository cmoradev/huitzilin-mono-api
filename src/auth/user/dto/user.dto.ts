import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('User')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
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
