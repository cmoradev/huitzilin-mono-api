import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { ActionDto } from './dto/action.dto';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';

@Resolver(() => ActionDto)
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}

  @Mutation(() => ActionDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: number,
  ): Promise<ActionDto> {
    return this.actionService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(ActionDto) })
    filter: Filter<ActionDto>,
  ): Promise<UpdateManyResponse> {
    return this.actionService.restoreMany(filter);
  }
}
