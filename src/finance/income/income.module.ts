import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Discount, ClipAccount } from 'src/miscellaneous';
import { Debit } from 'src/school';
import { IncomeDto } from './dto/income.dto';
import { Income } from './entities/income.entity';
import { IncomeResolver } from './income.resolver';
import { IncomeService } from './income.service';
import { IncomeEventSubscriber } from './income.subscriber';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          Income,
          Debit,
          Discount,
          ClipAccount,
        ]),
      ],
      services: [IncomeService],
      resolvers: [
        {
          DTOClass: IncomeDto,
          ServiceClass: IncomeService,
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
  providers: [IncomeResolver, IncomeEventSubscriber],
})
export class IncomeModule {}
