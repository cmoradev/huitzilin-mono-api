import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    return this.scheduleService.create(createScheduleInput);
  }

  @Query(() => [Schedule], { name: 'schedule' })
  findAll() {
    return this.scheduleService.findAll();
  }

  @Query(() => Schedule, { name: 'schedule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.findOne(id);
  }

  @Mutation(() => Schedule)
  updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    return this.scheduleService.update(updateScheduleInput.id, updateScheduleInput);
  }

  @Mutation(() => Schedule)
  removeSchedule(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.remove(id);
  }
}
