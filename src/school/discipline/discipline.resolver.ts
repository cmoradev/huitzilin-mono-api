import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';
import { DisciplineService } from './discipline.service';
import { DisciplineDto } from './dto/discipline.dto';

@Resolver(() => DisciplineDto)
export class DisciplineResolver {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Mutation(() => DisciplineDto)
  restoreOneDiscipline(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<DisciplineDto> {
    return this.disciplineService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyDisciplines(
    @Args('input', { type: () => FilterType(DisciplineDto) })
    filter: Filter<DisciplineDto>,
  ): Promise<UpdateManyResponse> {
    return this.disciplineService.restoreMany(filter);
  }
}
