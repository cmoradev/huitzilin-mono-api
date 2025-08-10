import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('CreateAction')
export class CreateActionInput {
  @Field(() => String, { nullable: false })
  resources: string;

  @Field(() => String, { nullable: false })
  route: string;

  @Field(() => [String], { nullable: false })
  actions: string[];

  @IsUUID()
  @Field(() => String, { nullable: false })
  policyId: string;
}
