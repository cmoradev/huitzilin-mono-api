import { InputType, Field, ID } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@InputType('CreateAction')
export class CreateActionInput {
  @IDField(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: false })
  resources: string;

  @Field(() => String, { nullable: false })
  route: string;

  @Field(() => [String], { nullable: false })
  actions: string[];
}
