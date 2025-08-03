import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('AccountsReceivable')
export class AccountsReceivableInput {
  @IsUUID()
  @Field(() => ID, { nullable: false })
  debitId: string;
}
