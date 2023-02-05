import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { Payload } from 'src/types/payload';
import { PostDTO } from './post.dto';
import { PostInput } from './post.input';
import { PostService } from './post.service';

const pubSub = new PubSub();
@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostDTO])
  @UseGuards(new AuthGuard())
  async posts() {
    return await this.postService.findAll();
  }

  @Query(() => PostDTO)
  @UseGuards(new AuthGuard())
  async post(@Args('_id') _id: string) {
    const post = await this.postService.findById(_id);

    return post;
  }

  @Mutation(() => PostDTO)
  @UseGuards(new AuthGuard())
  async createPost(
    @Args('input') input: PostInput,
    @Context('user') user: Payload,
  ) {
    const newPost = await this.postService.createPost({
      ...input,
      createdBy: user._id,
    });

    pubSub.publish('roomAdded', newPost);
    return newPost;
  }

  //   @Mutation(() => PostDTO)
  //   @UseGuards(new AuthGuard())
  //   async joinPost(@Args('_id') _id: string, @Context('user') user: Payload) {
  //     const newPost = await this.roomService.joinPost(_id, user._id);

  //     pubSub.publish('userJoined', user);
  //     return newPost;
  //   }

  //   @Subscription(() => PostDTO, {
  //     name: 'roomAdded',
  //     resolve: value => value,
  //   })
  //   roomAdded() {
  //     return pubSub.asyncIterator('roomAdded');
  //   }
}
