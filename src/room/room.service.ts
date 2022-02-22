import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private roomModel: Model<Room>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createRoom(createRoomDto: any): Promise<Room> {
    const createdRoom = new this.roomModel({
      ...createRoomDto,
    });

    return await createdRoom
      .save()
      .then(room => room.populate('createdBy users').execPopulate());
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel
      .find()
      .populate('createdBy users')
      .exec();
  }

  async findById(_id: string): Promise<Room> {
    return this.roomModel
      .findById(_id)
      .populate('createdBy users')
      .exec();
  }

  async joinRoom(_id: string, userId: string): Promise<Room> {
    const user = await this.userModel.findById(userId).exec();

    const newRoom = await this.roomModel
      .findOneAndUpdate({ _id }, { users: [user] }, { new: true })
      .populate('createdBy users');

    console.log('newRoom', newRoom);

    return newRoom;
  }
}
