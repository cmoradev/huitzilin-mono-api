import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePeriodInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
