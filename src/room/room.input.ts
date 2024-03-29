import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RoomInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;
}
