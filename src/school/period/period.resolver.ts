import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeriodService } from './period.service';
import { Period } from './entities/period.entity';
import { CreatePeriodInput } from './dto/create-period.input';
import { UpdatePeriodInput } from './dto/update-period.input';

@Resolver(() => Period)
export class PeriodResolver {
  constructor(private readonly periodService: PeriodService) {}

  @Mutation(() => Period)
  createPeriod(@Args('createPeriodInput') createPeriodInput: CreatePeriodInput) {
    return this.periodService.create(createPeriodInput);
  }

  @Query(() => [Period], { name: 'period' })
  findAll() {
    return this.periodService.findAll();
  }

  @Query(() => Period, { name: 'period' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.periodService.findOne(id);
  }

  @Mutation(() => Period)
  updatePeriod(@Args('updatePeriodInput') updatePeriodInput: UpdatePeriodInput) {
    return this.periodService.update(updatePeriodInput.id, updatePeriodInput);
  }

  @Mutation(() => Period)
  removePeriod(@Args('id', { type: () => Int }) id: number) {
    return this.periodService.remove(id);
  }
}
