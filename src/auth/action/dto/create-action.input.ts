import { InputType, Field } from '@nestjs/graphql';
import { ActionEffect } from '../enums';

@InputType('CreateAction')
export class CreateActionInput {
  @Field(() => ActionEffect, { nullable: false })
  effect: ActionEffect;

  @Field(() => String, { nullable: false })
  action: string;

  @Field(() => String, { nullable: false })
  route: string;

  @Field(() => String, { nullable: false })
  policyId: string;
}
