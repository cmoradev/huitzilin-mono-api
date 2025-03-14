import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType('Session')
export class SessionDto {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  exp: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  iat: Date;
}
