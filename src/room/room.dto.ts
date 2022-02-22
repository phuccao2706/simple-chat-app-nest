import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserDTO } from 'src/user/user.dto';

@ObjectType()
export class RoomDTO {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly createdBy: UserDTO;

  @Field(type => [UserDTO], { nullable: true })
  readonly users?: UserDTO[];

  @Field()
  readonly createdAt?: number;
}
