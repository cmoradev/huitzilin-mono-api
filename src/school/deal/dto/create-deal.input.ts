import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDealInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
