import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto/classroom.dto';

@Resolver(() => ClassroomDto)
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Mutation(() => ClassroomDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<ClassroomDto> {
    return this.classroomService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(ClassroomDto) })
    filter: Filter<ClassroomDto>,
  ): Promise<UpdateManyResponse> {
    return this.classroomService.restoreMany(filter);
  }
}
