import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument, RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(RoomEntity.name) private roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(createRoomDto: any): Promise<RoomEntity> {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomModel.find().exec();
  }
}
