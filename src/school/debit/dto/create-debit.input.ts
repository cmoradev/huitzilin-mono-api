import {
  InputType,
  Int,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { DebitState } from '../enums';
import { Frequency } from 'src/school/fee/enums';
import { IsUUID } from 'class-validator';

@InputType('CreateDebit')
export class CreateDebitInput {
  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  value: number;

  @Field(() => DebitState, { nullable: false })
  state: DebitState;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @Field(() => Date, { nullable: false })
  dueDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  paymentDate: Date;

  @IsUUID()
  @Field(() => String, { nullable: false })
  enrollmentId: string;
}
