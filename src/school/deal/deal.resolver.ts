import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DealService } from './deal.service';
import { Deal } from './entities/deal.entity';
import { CreateDealInput } from './dto/create-deal.input';
import { UpdateDealInput } from './dto/update-deal.input';

@Resolver(() => Deal)
export class DealResolver {
  constructor(private readonly dealService: DealService) {}

  @Mutation(() => Deal)
  createDeal(@Args('createDealInput') createDealInput: CreateDealInput) {
    return this.dealService.create(createDealInput);
  }

  @Query(() => [Deal], { name: 'deal' })
  findAll() {
    return this.dealService.findAll();
  }

  @Query(() => Deal, { name: 'deal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dealService.findOne(id);
  }

  @Mutation(() => Deal)
  updateDeal(@Args('updateDealInput') updateDealInput: UpdateDealInput) {
    return this.dealService.update(updateDealInput.id, updateDealInput);
  }

  @Mutation(() => Deal)
  removeDeal(@Args('id', { type: () => Int }) id: number) {
    return this.dealService.remove(id);
  }
}
