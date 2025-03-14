import { ObjectType, Field, Float } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from '../enums';

@ObjectType('Fee')
export class FeeDto extends BaseDto {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @IsUUID()
  @Field(() => String, { nullable: false })
  courseId: string;
}
