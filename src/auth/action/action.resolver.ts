import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { ActionDto } from './dto/action.dto';

@Resolver(() => ActionDto)
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}

  @Mutation(() => ActionDto)
  createAction(@Args('createActionInput') createActionInput: CreateActionInput) {
    return this.actionService.create(createActionInput);
  }

  @Query(() => [ActionDto], { name: 'action' })
  findAll() {
    return this.actionService.findAll();
  }

  @Query(() => ActionDto, { name: 'action' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.actionService.findOne(id);
  }

  @Mutation(() => ActionDto)
  updateAction(@Args('updateActionInput') updateActionInput: UpdateActionInput) {
    return this.actionService.update(updateActionInput.id, updateActionInput);
  }

  @Mutation(() => ActionDto)
  removeAction(@Args('id', { type: () => Int }) id: number) {
    return this.actionService.remove(id);
  }
}
