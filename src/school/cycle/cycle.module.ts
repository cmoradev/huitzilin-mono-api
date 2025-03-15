import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CycleResolver } from './cycle.resolver';
import { CycleService } from './cycle.service';
import { CreateCycleInput } from './dto/create-cycle.input';
import { CycleDto } from './dto/cycle.dto';
import { UpdateCycleInput } from './dto/update-cycle.input';
import { Cycle } from './entities/cycle.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Cycle])],
      services: [CycleService],
      resolvers: [
        {
          DTOClass: CycleDto,
          CreateDTOClass: CreateCycleInput,
          UpdateDTOClass: UpdateCycleInput,
          ServiceClass: CycleService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [CycleResolver],
})
export class CycleModule {}
