import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { PolicyService } from './policy.service';
import { PolicyDto } from './dto/policy.dto';
import { Filter, UpdateManyResponse } from '@ptc-org/nestjs-query-core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@ptc-org/nestjs-query-graphql';

@Resolver(() => PolicyDto)
export class PolicyResolver {
  constructor(private readonly policyService: PolicyService) {}

  @Mutation(() => PolicyDto)
  restoreOneVideo(
    @Args('input', { type: () => ID }) id: string,
  ): Promise<PolicyDto> {
    return this.policyService.restoreOne(id);
  }

  @Mutation(() => UpdateManyResponseType())
  restoreManyVideos(
    @Args('input', { type: () => FilterType(PolicyDto) })
    filter: Filter<PolicyDto>,
  ): Promise<UpdateManyResponse> {
    return this.policyService.restoreMany(filter);
  }
}
