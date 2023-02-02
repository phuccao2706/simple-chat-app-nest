import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserDTO } from 'src/user/user.dto';

export interface AuthDTO {
  username: string;
  password: string;
}

@ObjectType()
export class AnotherAuthDTO {
  @Field()
  user: UserDTO;

  @Field()
  readonly token: string;
}
