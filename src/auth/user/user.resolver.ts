import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { SessionDto } from './dto/session.dto';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => SessionDto)
  signIn(@Args('input') input: SignInInput): Promise<SessionDto> {
    return this.userService.signIn(input);
  }

  @Mutation(() => SessionDto)
  signUp(@Args('input') input: SignUpInput): Promise<SessionDto> {
    return this.userService.signUp(input);
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
