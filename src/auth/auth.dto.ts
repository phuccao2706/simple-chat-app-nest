import { ObjectType, Field, ID } from '@nestjs/graphql';

export interface AuthDTO {
  username: string;
  password: string;
}

@ObjectType()
export class AnotherAuthDTO {
  // @Field(() => ID)
  // user: AuthDTO;

  @Field()
  readonly token: string;
}
