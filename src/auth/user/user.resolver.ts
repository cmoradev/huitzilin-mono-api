import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserDto], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserDto, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserDto)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserDto)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
