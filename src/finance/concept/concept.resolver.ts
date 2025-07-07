import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { ConceptService } from './concept.service';
import { ConceptDto } from './dto/concept.dto';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';

@Resolver(() => ConceptDto)
export class ConceptResolver {
  constructor(private readonly conceptService: ConceptService) {}

  @Mutation(() => ConceptDto)
  restoreOneConcept(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<ConceptDto> {
    return this.conceptService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyConcepts(
    @Args('input', { type: () => FilterType(ConceptDto) })
    filter: Filter<ConceptDto>,
  ): Promise<UpdateManyResponse> {
    return this.conceptService.restoreMany(filter);
  }
}
