import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { PaymentDto } from './dto/payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => PaymentDto)
  restoreOnePayment(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<PaymentDto> {
    return this.paymentService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyPayments(
    @Args('input', { type: () => FilterType(PaymentDto) })
    filter: Filter<PaymentDto>,
  ): Promise<UpdateManyResponse> {
    return this.paymentService.restoreMany(filter);
  }
}
