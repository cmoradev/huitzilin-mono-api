import { CreatePeriodInput } from './create-period.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePeriodInput extends PartialType(CreatePeriodInput) {
  @Field(() => Int)
  id: number;
}
