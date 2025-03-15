import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Resolver(() => StudentDto)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<StudentDto> {
    return this.studentService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(StudentDto) })
    filter: Filter<StudentDto>,
  ): Promise<UpdateManyResponse> {
    return this.studentService.restoreMany(filter);
  }
}
