import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Payload } from 'src/types/payload';
import { UserService } from 'src/user/user.service';
import { AuthDTO, AnotherAuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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
