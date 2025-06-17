import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DisciplineResolver } from './discipline.resolver';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineInput } from './dto/create-discipline.input';
import { DisciplineDto } from './dto/discipline.dto';
import { UpdateDisciplineInput } from './dto/update-discipline.input';
import { Discipline } from './entities/discipline.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Discipline])],
      services: [DisciplineService],
      resolvers: [
        {
          DTOClass: DisciplineDto,
          CreateDTOClass: CreateDisciplineInput,
          UpdateDTOClass: UpdateDisciplineInput,
          ServiceClass: DisciplineService,
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
  providers: [DisciplineResolver],
})
export class DisciplineModule {}
