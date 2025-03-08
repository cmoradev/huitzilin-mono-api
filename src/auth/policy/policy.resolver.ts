import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PolicyService } from './policy.service';
import { CreatePolicyInput } from './dto/create-policy.input';
import { UpdatePolicyInput } from './dto/update-policy.input';
import { PolicyDto } from './dto/policy.dto';

@Resolver(() => PolicyDto)
export class PolicyResolver {
  constructor(private readonly policyService: PolicyService) {}

  @Mutation(() => PolicyDto)
  createPolicy(@Args('createPolicyInput') createPolicyInput: CreatePolicyInput) {
    return this.policyService.create(createPolicyInput);
  }

  @Query(() => [PolicyDto], { name: 'policy' })
  findAll() {
    return this.policyService.findAll();
  }

  @Query(() => PolicyDto, { name: 'policy' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.policyService.findOne(id);
  }

  @Mutation(() => PolicyDto)
  updatePolicy(@Args('updatePolicyInput') updatePolicyInput: UpdatePolicyInput) {
    return this.policyService.update(updatePolicyInput.id, updatePolicyInput);
  }

  @Mutation(() => PolicyDto)
  removePolicy(@Args('id', { type: () => Int }) id: number) {
    return this.policyService.remove(id);
  }
}
