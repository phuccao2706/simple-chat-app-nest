import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserDTO } from 'src/user/user.dto';

@ObjectType()
export class PostDTO {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  readonly title?: string;

  @Field({ nullable: true })
  readonly image?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly createdBy: UserDTO;

  @Field()
  readonly createdAt?: number;
}
