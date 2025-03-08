import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateActionInput } from './create-action.input';

@InputType('UpdateAction')
export class UpdateActionInput extends PartialType(CreateActionInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
