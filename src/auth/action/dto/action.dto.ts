import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { ActionEffect } from '../enums';

@ObjectType('Action')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class ActionDto extends BaseDto {
  @Field(() => ActionEffect, { nullable: false })
  effect: ActionEffect;

  @FilterableField(() => String, { nullable: false })
  action: string;

  @FilterableField(() => String, { nullable: false })
  route: string;

  @FilterableField(() => String, { nullable: false })
  policyId: string;
}
