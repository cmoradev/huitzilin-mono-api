import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from '../enums';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('Fee')
export class FeeDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @FilterableField(() => String, { nullable: false })
  courseId: string;
}
