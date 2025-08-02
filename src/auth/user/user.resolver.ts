import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { SessionDto } from './dto/session.dto';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

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

  @Mutation(() => UserDto)
  updateOneUser(
    @Args('update') update: UpdateUserInput,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.userService.update(id, update);
  }
}
