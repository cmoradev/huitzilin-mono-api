import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength, IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';
import { ActionEffect } from '../enums';

@ObjectType('Action')
export class ActionDto extends BaseDto {
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

  // policy: PolicyDto;
}
