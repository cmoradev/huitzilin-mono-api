import { CreateDebitInput } from './create-debit.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDebit')
export class UpdateDebitInput extends PartialType(CreateDebitInput) {
  @Field(() => ID, { nullable: false })
  id: string;
}
