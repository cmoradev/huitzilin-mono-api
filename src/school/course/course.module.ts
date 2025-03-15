import { Module } from '@nestjs/common';
import { CourseResolver } from './course.resolver';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CourseService } from './course.service';
import { UpdateCourseInput } from './dto/update-course.input';
import { CreateCourseInput } from './dto/create-course.input';
import { CourseDto } from './dto/course.dto';
import { Course } from './entities/course.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Course])],
      services: [CourseService],
      resolvers: [
        {
          DTOClass: CourseDto,
          CreateDTOClass: CreateCourseInput,
          UpdateDTOClass: UpdateCourseInput,
          ServiceClass: CourseService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [CourseResolver],
})
export class CourseModule {}
