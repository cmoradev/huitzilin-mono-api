import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DebitResolver } from './debit.resolver';
import { DebitService } from './debit.service';
import { CreateDebitInput } from './dto/create-debit.input';
import { DebitDto } from './dto/debit.dto';
import { UpdateDebitInput } from './dto/update-debit.input';
import { Debit } from './entities/debit.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Debit])],
      services: [DebitService],
      resolvers: [
        {
          DTOClass: DebitDto,
          CreateDTOClass: CreateDebitInput,
          UpdateDTOClass: UpdateDebitInput,
          ServiceClass: DebitService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [DebitResolver],
})
export class DebitModule {}
