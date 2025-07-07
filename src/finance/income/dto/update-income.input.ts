import { CreateIncomeInput } from './create-income.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateIncome')
export class UpdateIncomeInput extends PartialType(CreateIncomeInput) {}
