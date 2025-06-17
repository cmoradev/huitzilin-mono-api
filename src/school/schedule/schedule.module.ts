import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { ScheduleDto } from './dto/schedule.dto';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { Schedule } from './entities/schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Schedule])],
      services: [ScheduleService],
      resolvers: [
        {
          DTOClass: ScheduleDto,
          CreateDTOClass: CreateScheduleInput,
          UpdateDTOClass: UpdateScheduleInput,
          ServiceClass: ScheduleService,
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
  providers: [ScheduleResolver],
})
export class ScheduleModule {}
