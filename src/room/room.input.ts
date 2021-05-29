import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RoomInput {
  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly createdBy: string;

  @Field()
  readonly createdAt: number;
}
