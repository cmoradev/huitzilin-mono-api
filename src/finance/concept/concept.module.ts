import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ConceptResolver } from './concept.resolver';
import { ConceptService } from './concept.service';
import { ConceptDto } from './dto/concept.dto';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';
import { Concept } from './entities/concept.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Concept])],
      services: [ConceptService],
      resolvers: [
        {
          DTOClass: ConceptDto,
          CreateDTOClass: CreateConceptInput,
          UpdateDTOClass: UpdateConceptInput,
          ServiceClass: ConceptService,
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
  providers: [ConceptResolver],
})
export class ConceptModule {}
