import { Resolver, Query } from '@nestjs/graphql';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDTO])
  async users() {
    return await this.userService.findAll();
  }
}
