import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DebitDiscountResolver } from './debit-discounts.resolver';
import { DebitDiscountService } from './debit-discounts.service';
import {
  CreateDebitDiscountInput,
  DebitDiscountDto,
  UpdateDiscountInput,
} from './dto';
import { DebitDiscount } from './entities/debit-discount.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DebitDiscount])],
      services: [DebitDiscountService],
      resolvers: [
        {
          DTOClass: DebitDiscountDto,
          CreateDTOClass: CreateDebitDiscountInput,
          UpdateDTOClass: UpdateDiscountInput,
          ServiceClass: DebitDiscountService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: false }, one: { disabled: false } },
          update: { many: { disabled: true }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [DebitDiscountResolver],
})
export class DebitDiscountModule {}
