import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('base')
export class BaseDto {
  @IDField(() => ID, { nullable: false })
  id: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: false })
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: false })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;

  @Field(() => Int, { nullable: false })
  version: number;
}
