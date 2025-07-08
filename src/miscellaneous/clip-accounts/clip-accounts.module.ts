import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ClipAccountsResolver } from './clip-accounts.resolver';
import { ClipAccountsService } from './clip-accounts.service';
import { UpdateClipAccountInput } from './dto/update-clip-account.input';
import { CreateClipAccountInput } from './dto/create-clip-account.input';
import { ClipAccountDto } from './dto/clip-account.dto';
import { ClipAccount } from './entities/clip-account.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ClipAccount])],
      services: [ClipAccountsService],
      resolvers: [
        {
          DTOClass: ClipAccountDto,
          CreateDTOClass: CreateClipAccountInput,
          UpdateDTOClass: UpdateClipAccountInput,
          ServiceClass: ClipAccountsService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: false }, one: { disabled: false } },
          update: { many: { disabled: true }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [ClipAccountsResolver],
})
export class ClipAccountsModule {}
