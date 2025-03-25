import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('base')
export class BaseDto {
  @IDField(() => ID, { nullable: false })
  id: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Date | null;

  @Field(() => Int, { nullable: false })
  version: number;
}
