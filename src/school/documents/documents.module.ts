import { Module } from '@nestjs/common';
import { DocumentService } from './documents.service';
import { DocumentResolver } from './documents.resolver';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { DocumentDto } from './dto/document.dto';
import { Document } from './entities/document.entity';
import { CreateDocumentInput, UpdateDocumentInput } from './dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Document])],
      services: [DocumentService],
      resolvers: [
        {
          DTOClass: DocumentDto,
          CreateDTOClass: CreateDocumentInput,
          UpdateDTOClass: UpdateDocumentInput,
          ServiceClass: DocumentService,
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
  providers: [DocumentResolver],
})
export class DocumentsModule {}
