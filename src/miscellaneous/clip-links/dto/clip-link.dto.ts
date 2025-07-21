import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';

@ObjectType('ClipLink')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class ClipLinkDto extends BaseDto {
  @Field(() => String, { nullable: false })
  link: string;

  @Field(() => String, { nullable: false })
  qr: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: false })
  expiresAt: Date;

  @FilterableField(() => String, { nullable: false })
  requestId: string;

  @FilterableField(() => String, { nullable: false })
  incomeId: string;
}
