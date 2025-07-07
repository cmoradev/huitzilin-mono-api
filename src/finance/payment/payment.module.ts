import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentDto } from './dto/payment.dto';
import { CreatePaymentInput } from './dto/create-payment.input';
import { PaymentEventSubscriber } from './payment.subscriber';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Payment])],
      services: [PaymentService],
      resolvers: [
        {
          DTOClass: PaymentDto,
          CreateDTOClass: CreatePaymentInput,
          UpdateDTOClass: CreatePaymentInput,
          ServiceClass: PaymentService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true }, one: { disabled: true } },
          update: { many: { disabled: true }, one: { disabled: true } },
          delete: { many: { disabled: true }, one: { disabled: true } },
        },
      ],
    }),
  ],
  providers: [PaymentResolver, PaymentEventSubscriber],
})
export class PaymentModule {}
