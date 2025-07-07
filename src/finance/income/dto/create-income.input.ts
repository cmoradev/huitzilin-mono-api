import { InputType, Field, Float } from '@nestjs/graphql';
import { IncomeState } from '../enum';
import { IsUUID } from 'class-validator';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@InputType('CreateIncome')
export class CreateIncomeInput {
  @Field(() => IncomeState, { nullable: false })
  state: IncomeState;

  @Field(() => Float, { nullable: false })
  subtotal: number;

  @Field(() => Float, { nullable: false })
  taxes: number;

  @Field(() => Float, { nullable: false })
  total: number;

  @Field(() => Float, { nullable: false })
  pendingPayment: number;

  @Field(() => String, { nullable: true })
  clipLink: string | null;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
