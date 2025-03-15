import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { ActionEffect } from '../enums';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('Action')
export class ActionDto extends BaseDto {
  @Field(() => ActionEffect, { nullable: false })
  effect: ActionEffect;

  @Field(() => String, { nullable: false })
  action: string;

  @Field(() => String, { nullable: false })
  route: string;

  @FilterableField(() => String, { nullable: false })
  policyId: string;
}
