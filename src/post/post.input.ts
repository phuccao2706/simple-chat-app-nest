import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostInput {
  @Field()
  readonly title: string;

  @Field()
  readonly image: string;

  @Field()
  readonly description: string;
}
