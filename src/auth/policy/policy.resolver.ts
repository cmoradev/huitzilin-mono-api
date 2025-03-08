import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PolicyService } from './policy.service';
import { Policy } from './entities/policy.entity';
import { CreatePolicyInput } from './dto/create-policy.input';
import { UpdatePolicyInput } from './dto/update-policy.input';

@Resolver(() => Policy)
export class PolicyResolver {
  constructor(private readonly policyService: PolicyService) {}

  @Mutation(() => Policy)
  createPolicy(@Args('createPolicyInput') createPolicyInput: CreatePolicyInput) {
    return this.policyService.create(createPolicyInput);
  }

  @Query(() => [Policy], { name: 'policy' })
  findAll() {
    return this.policyService.findAll();
  }

  @Query(() => Policy, { name: 'policy' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.policyService.findOne(id);
  }

  @Mutation(() => Policy)
  updatePolicy(@Args('updatePolicyInput') updatePolicyInput: UpdatePolicyInput) {
    return this.policyService.update(updatePolicyInput.id, updatePolicyInput);
  }

  @Mutation(() => Policy)
  removePolicy(@Args('id', { type: () => Int }) id: number) {
    return this.policyService.remove(id);
  }
}
