import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos';

@ObjectType('Period')
export class PeriodDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @Field(() => String, { nullable: false })
  days: string;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @Field(() => String, { nullable: false })
  firstHour: string;

  @Field(() => String, { nullable: false })
  lastHour: string;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
