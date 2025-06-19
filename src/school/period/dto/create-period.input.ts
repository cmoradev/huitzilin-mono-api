import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreatePeriod')
export class CreatePeriodInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @Field(() => String, { nullable: false })
  firstHour: string;

  @Field(() => String, { nullable: false })
  lastHour: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
