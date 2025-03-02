import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { Action } from './entities/action.entity';
import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';

@Resolver(() => Action)
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}

  @Mutation(() => Action)
  createAction(@Args('createActionInput') createActionInput: CreateActionInput) {
    return this.actionService.create(createActionInput);
  }

  @Query(() => [Action], { name: 'action' })
  findAll() {
    return this.actionService.findAll();
  }

  @Query(() => Action, { name: 'action' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.actionService.findOne(id);
  }

  @Mutation(() => Action)
  updateAction(@Args('updateActionInput') updateActionInput: UpdateActionInput) {
    return this.actionService.update(updateActionInput.id, updateActionInput);
  }

  @Mutation(() => Action)
  removeAction(@Args('id', { type: () => Int }) id: number) {
    return this.actionService.remove(id);
  }
}
