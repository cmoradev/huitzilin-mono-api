import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Deal {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
