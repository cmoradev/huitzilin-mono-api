import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';

@Resolver(() => BranchDto)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @Mutation(() => BranchDto)
  createBranch(@Args('createBranchInput') createBranchInput: CreateBranchInput) {
    return this.branchService.create(createBranchInput);
  }

  @Query(() => [BranchDto], { name: 'branch' })
  findAll() {
    return this.branchService.findAll();
  }

  @Query(() => BranchDto, { name: 'branch' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.findOne(id);
  }

  @Mutation(() => BranchDto)
  updateBranch(@Args('updateBranchInput') updateBranchInput: UpdateBranchInput) {
    return this.branchService.update(updateBranchInput.id, updateBranchInput);
  }

  @Mutation(() => BranchDto)
  removeBranch(@Args('id', { type: () => Int }) id: number) {
    return this.branchService.remove(id);
  }
}
