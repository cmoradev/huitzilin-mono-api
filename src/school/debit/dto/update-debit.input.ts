import { CreateDebitInput } from './create-debit.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateDebit')
export class UpdateDebitInput extends PartialType(CreateDebitInput) {}
