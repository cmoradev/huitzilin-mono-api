import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DisciplineService } from './discipline.service';
import { Discipline } from './entities/discipline.entity';
import { CreateDisciplineInput } from './dto/create-discipline.input';
import { UpdateDisciplineInput } from './dto/update-discipline.input';

@Resolver(() => Discipline)
export class DisciplineResolver {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Mutation(() => Discipline)
  createDiscipline(@Args('createDisciplineInput') createDisciplineInput: CreateDisciplineInput) {
    return this.disciplineService.create(createDisciplineInput);
  }

  @Query(() => [Discipline], { name: 'discipline' })
  findAll() {
    return this.disciplineService.findAll();
  }

  @Query(() => Discipline, { name: 'discipline' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.disciplineService.findOne(id);
  }

  @Mutation(() => Discipline)
  updateDiscipline(@Args('updateDisciplineInput') updateDisciplineInput: UpdateDisciplineInput) {
    return this.disciplineService.update(updateDisciplineInput.id, updateDisciplineInput);
  }

  @Mutation(() => Discipline)
  removeDiscipline(@Args('id', { type: () => Int }) id: number) {
    return this.disciplineService.remove(id);
  }
}
