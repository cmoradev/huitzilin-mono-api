import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Classroom } from '..';
import { ClassroomResolver } from './classroom.resolver';
import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto/classroom.dto';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Classroom])],
      services: [ClassroomService],
      resolvers: [
        {
          DTOClass: ClassroomDto,
          CreateDTOClass: CreateClassroomInput,
          UpdateDTOClass: UpdateClassroomInput,
          ServiceClass: ClassroomService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [ClassroomResolver],
})
export class ClassroomModule {}
