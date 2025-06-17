import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Period } from './entities/period.entity';
import { PeriodService } from './period.service';
import { PeriodDto } from './dto/period.dto';
import { CreatePeriodInput } from './dto/create-period.input';
import { UpdatePeriodInput } from './dto/update-period.input';
import { PeriodResolver } from './period.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Period])],
      services: [PeriodService],
      resolvers: [
        {
          DTOClass: PeriodDto,
          CreateDTOClass: CreatePeriodInput,
          UpdateDTOClass: UpdatePeriodInput,
          ServiceClass: PeriodService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true }, one: { disabled: false } },
          update: { many: { disabled: true }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [PeriodResolver],
})
export class PeriodModule {}
