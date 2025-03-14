import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';
import { Frequency } from 'src/school/fee/enums';
import { DebitState } from '../enums';

@ObjectType('Debit')
export class DebitDto extends BaseDto {
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
