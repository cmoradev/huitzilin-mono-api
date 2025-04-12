import { Field, Float, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { Frequency } from '../enums';

@InputType('CreateFee')
export class CreateFeeInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @IsUUID()
  @Field(() => String, { nullable: false })
  activityId: string;
}
