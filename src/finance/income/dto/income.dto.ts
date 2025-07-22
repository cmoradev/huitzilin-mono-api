import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { IsUUID } from 'class-validator';
import { BaseDto } from 'src/common/dtos';
import { IncomeState } from '../enum';
import { StudentDto } from 'src/school';
import { ConceptDto } from 'src/finance/concept/dto/concept.dto';
import { PaymentDto } from 'src/finance/payment/dto/payment.dto';
import { ClipLinkDto } from 'src/miscellaneous';

@ObjectType('Income')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@FilterableUnPagedRelation('students', () => StudentDto)
@FilterableUnPagedRelation('concepts', () => ConceptDto)
@FilterableUnPagedRelation('payments', () => PaymentDto)
@FilterableUnPagedRelation('clipLinks', () => ClipLinkDto)
export class IncomeDto extends BaseDto {
  @FilterableField(() => Int, { nullable: false })
  folio: number;

  @Field(() => IncomeState, { nullable: false })
  state: IncomeState;

  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => Float, { nullable: false })
  discount: number;

  @Field(() => Float, { nullable: false })
  subtotal: number;

  @Field(() => Float, { nullable: false })
  taxes: number;

  @Field(() => Float, { nullable: false })
  total: number;

  @Field(() => Float, { nullable: false })
  pendingPayment: number;

  @IsUUID()
  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
