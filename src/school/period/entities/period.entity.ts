import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Period {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
