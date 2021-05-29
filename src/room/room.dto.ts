import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class RoomDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly createdBy: string;

  @Field()
  readonly createdAt: number;
}
