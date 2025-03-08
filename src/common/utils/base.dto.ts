import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType('base')
export class BaseDto {
  @Field(() => ID, { nullable: false })
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
