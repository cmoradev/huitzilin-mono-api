import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateTutorInput } from './dto/create-tutor.input';
import { TutorDto } from './dto/tutor.dto';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { Tutor } from './entities/tutor.entity';
import { TutorResolver } from './tutor.resolver';
import { TutorService } from './tutor.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Tutor])],
      services: [TutorService],
      resolvers: [
        {
          DTOClass: TutorDto,
          CreateDTOClass: CreateTutorInput,
          UpdateDTOClass: UpdateTutorInput,
          ServiceClass: TutorService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [TutorResolver],
})
export class TutorModule {}
