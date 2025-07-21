import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';

@ObjectType('ClipAccount')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class ClipAccountDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  webhook: string;

  @Field(() => String, { nullable: false })
  default: string;

  @Field(() => String, { nullable: false })
  success: string;

  @Field(() => String, { nullable: false })
  error: string;
}
