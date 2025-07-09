import { Field, Float, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, Min } from 'class-validator';
import { Frequency } from '../enums';

@InputType('CreateFee')
export class CreateFeeInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Min(1)
  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @Field(() => Boolean, { nullable: false })
  autoLoad: boolean;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @IsUUID()
  @Field(() => String, { nullable: false })
  packageId: string;
}
