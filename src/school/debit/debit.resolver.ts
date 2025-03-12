import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DebitService } from './debit.service';
import { CreateDebitInput } from './dto/create-debit.input';
import { UpdateDebitInput } from './dto/update-debit.input';
import { DebitDto } from './dto/debit.dto';

@Resolver(() => DebitDto)
export class DebitResolver {
  constructor(private readonly debitService: DebitService) {}

  @Mutation(() => DebitDto)
  createDebit(@Args('createDebitInput') createDebitInput: CreateDebitInput) {
    return this.debitService.create(createDebitInput);
  }

  @Query(() => [DebitDto], { name: 'debit' })
  findAll() {
    return this.debitService.findAll();
  }

  @Query(() => DebitDto, { name: 'debit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.debitService.findOne(id);
  }

  @Mutation(() => DebitDto)
  updateDebit(@Args('updateDebitInput') updateDebitInput: UpdateDebitInput) {
    return this.debitService.update(updateDebitInput.id, updateDebitInput);
  }

  @Mutation(() => DebitDto)
  removeDebit(@Args('id', { type: () => Int }) id: number) {
    return this.debitService.remove(id);
  }
}
