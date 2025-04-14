import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateCount')
export class UpdateCountResponse {
  @Field(() => Int, { nullable: true })
  updatedCount: number;
}
