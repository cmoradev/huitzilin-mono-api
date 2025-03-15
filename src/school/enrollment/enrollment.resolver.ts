import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { EnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentService } from './enrollment.service';

@Resolver(() => EnrollmentDto)
export class EnrollmentResolver {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Mutation(() => EnrollmentDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<EnrollmentDto> {
    return this.enrollmentService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(EnrollmentDto) })
    filter: Filter<EnrollmentDto>,
  ): Promise<UpdateManyResponse> {
    return this.enrollmentService.restoreMany(filter);
  }
}
