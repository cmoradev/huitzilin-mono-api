import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';

@Resolver(() => TeacherDto)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => TeacherDto)
  restoreOneTeacher(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<TeacherDto> {
    return this.teacherService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyTeachers(
    @Args('input', { type: () => FilterType(TeacherDto) })
    filter: Filter<TeacherDto>,
  ): Promise<UpdateManyResponse> {
    return this.teacherService.restoreMany(filter);
  }
}
