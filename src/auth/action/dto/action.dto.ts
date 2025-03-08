import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength, IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';
import { ActionEffect } from '../enums';

@ObjectType('Action')
export class ActionDto extends BaseDto {
  @Field(() => ActionEffect, { nullable: false })
  effect: ActionEffect;

  @IsUUID()
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  action: string;

  @IsUUID()
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  route: string;

  @Field(() => String, { nullable: false })
  policyId: string;

  // policy: PolicyDto;

  @Field(() => String, { nullable: false })
  branchId: string;

  // branch: BranchDto;
}
