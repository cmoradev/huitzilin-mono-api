import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DiscountResolver } from './discounts.resolver';
import { DiscountService } from './discounts.service';
import { CreateDiscountInput, DiscountDto, UpdateDiscountInput } from './dto';
import { Discount } from './entities/discount.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Discount])],
      services: [DiscountService],
      resolvers: [
        {
          DTOClass: DiscountDto,
          CreateDTOClass: CreateDiscountInput,
          UpdateDTOClass: UpdateDiscountInput,
          ServiceClass: DiscountService,
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
  providers: [DiscountResolver],
})
export class DiscountModule {}
