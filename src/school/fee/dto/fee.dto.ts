import { Field, Float, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from '../enums';

@ObjectType('Fee')
@QueryOptions({ defaultSort: [{ field: 'id', direction: SortDirection.DESC }] })
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
