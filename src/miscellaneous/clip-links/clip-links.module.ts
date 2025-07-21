import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ClipLink } from './entities/clip-link.entity';
import { ClipLinksService } from './clip-links.service';
import { UpdateClipLinkInput } from './dto/update-clip-link.input';
import { CreateClipLinkInput } from './dto/create-clip-link.input';
import { ClipLinkDto } from './dto/clip-link.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ClipLink])],
      services: [ClipLinksService],
      resolvers: [
        {
          DTOClass: ClipLinkDto,
          CreateDTOClass: CreateClipLinkInput,
          UpdateDTOClass: UpdateClipLinkInput,
          ServiceClass: ClipLinksService,
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
})
export class ClipLinksModule {}
