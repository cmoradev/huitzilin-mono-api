import { InputType, Field } from '@nestjs/graphql';
import { ActionEffect } from '../enums';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateAction')
export class CreateActionInput {
  @Field(() => ActionEffect, { nullable: false })
  effect: ActionEffect;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  action: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  route: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  policyId: string;
}
