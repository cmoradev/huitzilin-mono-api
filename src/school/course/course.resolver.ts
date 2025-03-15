import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@Resolver(() => CourseDto)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => CourseDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<CourseDto> {
    return this.courseService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(CourseDto) })
    filter: Filter<CourseDto>,
  ): Promise<UpdateManyResponse> {
    return this.courseService.restoreMany(filter);
  }
}
