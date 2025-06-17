import { CreatePeriodInput } from './create-period.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdatePeriod')
export class UpdatePeriodInput extends PartialType(CreatePeriodInput) {}
