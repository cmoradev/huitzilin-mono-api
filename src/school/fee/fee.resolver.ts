import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeeService } from './fee.service';
import { FeeDto } from './dto/fee.dto';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.input';

@Resolver(() => FeeDto)
export class FeeResolver {
  constructor(private readonly feeService: FeeService) {}

  @Mutation(() => FeeDto)
  createFee(@Args('createFeeInput') createFeeInput: CreateFeeInput) {
    return this.feeService.create(createFeeInput);
  }

  @Query(() => [FeeDto], { name: 'fee' })
  findAll() {
    return this.feeService.findAll();
  }

  @Query(() => FeeDto, { name: 'fee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feeService.findOne(id);
  }

  @Mutation(() => FeeDto)
  updateFee(@Args('updateFeeInput') updateFeeInput: UpdateFeeInput) {
    return this.feeService.update(updateFeeInput.id, updateFeeInput);
  }

  @Mutation(() => FeeDto)
  removeFee(@Args('id', { type: () => Int }) id: number) {
    return this.feeService.remove(id);
  }
}
