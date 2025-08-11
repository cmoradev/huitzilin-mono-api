import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ActionResolver } from './action.resolver';
import { ActionService } from './action.service';
import { ActionDto } from './dto/action.dto';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { Action } from './entities/action.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Action])],
      services: [ActionService],
      resolvers: [
        {
          DTOClass: ActionDto,
          CreateDTOClass: CreateActionInput,
          UpdateDTOClass: UpdateActionInput,
          ServiceClass: ActionService,
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
  providers: [ActionResolver],
})
export class ActionModule {}
