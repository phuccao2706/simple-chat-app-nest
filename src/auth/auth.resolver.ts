import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { Payload } from 'src/types/payload';
import { UserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDTO, AnotherAuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Query(() => UserDTO)
  @UseGuards(new AuthGuard())
  async findByToken(@Context('user') user: Payload) {
    console.log(user);
    return await this.userService.findByPayload(user);
  }

  @Mutation(() => AnotherAuthDTO)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const auth: AuthDTO = { username, password };

    const user = await this.userService.findByLogin(auth);
    const payload: Payload = {
      _id: user._id,
      username: user.username,
    };

    const token = await this.authService.signPayload(payload);

    return { token, user };
  }

  @Mutation(() => AnotherAuthDTO)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const input: AuthDTO = { username, password };

    const newUser = await this.userService.createUser(input);

    const payload: Payload = {
      _id: newUser._id,
      username: newUser.username,
    };

    const token = await this.authService.signPayload(payload);
    return { token };
  }
}
