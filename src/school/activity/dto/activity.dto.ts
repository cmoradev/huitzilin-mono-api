import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Activity')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class ActivityDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @FilterableField(() => Boolean, { nullable: false })
  isPackage: boolean;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
