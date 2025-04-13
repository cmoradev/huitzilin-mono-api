import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { LevelResolver } from './level.resolver';
import { LevelService } from './level.service';
import { CreateLevelInput } from './dto/create-level.input';
import { LevelDto } from './dto/level.dto';
import { UpdateLevelInput } from './dto/update-level.input';
import { Level } from './entities/level.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Level])],
      services: [LevelService],
      resolvers: [
        {
          DTOClass: LevelDto,
          CreateDTOClass: CreateLevelInput,
          UpdateDTOClass: UpdateLevelInput,
          ServiceClass: LevelService,
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
  providers: [LevelResolver],
})
export class LevelModule {}
