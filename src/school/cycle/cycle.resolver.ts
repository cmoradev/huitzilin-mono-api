import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CycleService } from './cycle.service';
import { CreateCycleInput } from './dto/create-cycle.input';
import { UpdateCycleInput } from './dto/update-cycle.input';
import { CycleDto } from './dto/cycle.dto';

@Resolver(() => CycleDto)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Mutation(() => CycleDto)
  createCycle(@Args('createCycleInput') createCycleInput: CreateCycleInput) {
    return this.cycleService.create(createCycleInput);
  }

  @Query(() => [CycleDto], { name: 'cycle' })
  findAll() {
    return this.cycleService.findAll();
  }

  @Query(() => CycleDto, { name: 'cycle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cycleService.findOne(id);
  }

  @Mutation(() => CycleDto)
  updateCycle(@Args('updateCycleInput') updateCycleInput: UpdateCycleInput) {
    return this.cycleService.update(updateCycleInput.id, updateCycleInput);
  }

  @Mutation(() => CycleDto)
  removeCycle(@Args('id', { type: () => Int }) id: number) {
    return this.cycleService.remove(id);
  }
}
