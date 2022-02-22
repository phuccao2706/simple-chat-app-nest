import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly username: string;

  // @Field()
  // readonly createdAt: number;
}
