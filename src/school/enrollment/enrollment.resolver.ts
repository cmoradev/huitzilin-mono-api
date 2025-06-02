import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { EnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentService } from './enrollment.service';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { SetOrderInput } from 'src/common/dtos';

@Resolver(() => EnrollmentDto)
export class EnrollmentResolver {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Mutation(() => UpdateCountResponse)
  setOrderEnrollments(
    @Args('input', { type: () => [SetOrderInput] })
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    return this.enrollmentService.setOrderEnrollments(params);
  }

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
