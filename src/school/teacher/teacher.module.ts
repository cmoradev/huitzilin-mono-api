import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { TeacherDto } from './dto/teacher.dto';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { Teacher } from './entities/teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { TeacherService } from './teacher.service';
import { TeacherEventSubscriber } from './teacher.subscriber';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Teacher])],
      services: [TeacherService],
      resolvers: [
        {
          DTOClass: TeacherDto,
          CreateDTOClass: CreateTeacherInput,
          UpdateDTOClass: UpdateTeacherInput,
          ServiceClass: TeacherService,
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
  providers: [TeacherResolver, TeacherEventSubscriber],
})
export class TeacherModule {}
