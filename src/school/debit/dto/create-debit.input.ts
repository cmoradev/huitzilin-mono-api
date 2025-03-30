import {
  InputType,
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

  @Field(() => Float, { nullable: false })
  quantity: number;

  @Field(() => DebitState, { nullable: false })
  state: DebitState;

  @Field(() => Frequency, { nullable: false })
  frequency: Frequency;

  @Field(() => String, { nullable: false })
  dueDate: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate: Date;

  @IsUUID()
  @Field(() => String, { nullable: false })
  enrollmentId: string;
}
