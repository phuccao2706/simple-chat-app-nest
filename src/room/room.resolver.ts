import { UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { Payload } from 'src/types/payload';
import { RoomDTO } from './room.dto';
import { RoomInput } from './room.input';
import { RoomService } from './room.service';

const pubSub = new PubSub();
@Resolver()
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => [RoomDTO])
  @UseGuards(new AuthGuard())
  async rooms() {
    return await this.roomService.findAll();
  }

  @Query(() => RoomDTO)
  @UseGuards(new AuthGuard())
  async room(@Args('_id') _id: string) {
    const room = await this.roomService.findById(_id);
    console.log(room);
    return room;
  }

  @Mutation(() => RoomDTO)
  @UseGuards(new AuthGuard())
  async createRoom(
    @Args('input') input: RoomInput,
    @Context('user') user: Payload,
  ) {
    const newRoom = await this.roomService.createRoom({
      ...input,
      createdBy: user._id,
    });

    console.log(newRoom);
    pubSub.publish('roomAdded', newRoom);
    return newRoom;
  }

  @Mutation(() => RoomDTO)
  @UseGuards(new AuthGuard())
  async joinRoom(@Args('_id') _id: string, @Context('user') user: Payload) {
    const newRoom = await this.roomService.joinRoom(_id, user._id);

    pubSub.publish('userJoined', user);
    return newRoom;
  }

  @Subscription(() => RoomDTO, {
    name: 'roomAdded',
    resolve: value => value,
  })
  roomAdded() {
    return pubSub.asyncIterator('roomAdded');
  }
}
