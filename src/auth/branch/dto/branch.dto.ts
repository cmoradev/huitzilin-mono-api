import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  QueryOptions,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { ClipAccountDto } from 'src/miscellaneous';

@ObjectType('Branch')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@UnPagedRelation('clipAccounts', () => ClipAccountDto)
export class BranchDto extends BaseDto {
  @Field(() => String, { nullable: false })
  picture: string;

  @FilterableField(() => String, { nullable: false })
  name: string;
}
