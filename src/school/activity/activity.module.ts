import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ActivityResolver } from './activity.resolver';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Activity])],
      services: [ActivityService],
      resolvers: [
        {
          DTOClass: ActivityDto,
          CreateDTOClass: CreateActivityInput,
          UpdateDTOClass: UpdateActivityInput,
          ServiceClass: ActivityService,
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
  providers: [ActivityResolver],
})
export class ActivityModule {}
