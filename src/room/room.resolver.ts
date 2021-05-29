import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { RoomDTO } from './room.dto';
import { RoomInput } from './room.input';
import { RoomService } from './room.service';

const pubSub = new PubSub();
@Resolver()
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => [RoomDTO])
  async rooms() {
    return this.roomService.findAll();
  }

  @Mutation(() => RoomDTO)
  async createRoom(@Args('input') input: RoomInput) {
    const newRoom = this.roomService.createRoom(input);

    pubSub.publish('roomAdded', newRoom);
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
