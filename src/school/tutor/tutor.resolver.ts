import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { TutorDto } from './dto/tutor.dto';
import { TutorService } from './tutor.service';

@Resolver(() => TutorDto)
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}

  @Mutation(() => TutorDto)
  restoreOneTutor(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<TutorDto> {
    return this.tutorService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyTutors(
    @Args('input', { type: () => FilterType(TutorDto) })
    filter: Filter<TutorDto>,
  ): Promise<UpdateManyResponse> {
    return this.tutorService.restoreMany(filter);
  }
}
