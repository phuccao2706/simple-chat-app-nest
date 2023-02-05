import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private roomModel: Model<Post>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createPost(createPostDto: any): Promise<Post> {
    const createdPost = new this.roomModel({
      ...createPostDto,
    });

    return await createdPost
      .save()
      .then(room => room.populate('createdBy users').execPopulate());
  }

  async findAll(): Promise<Post[]> {
    return this.roomModel
      .find()
      .populate('createdBy users')
      .exec();
  }

  async findById(_id: string): Promise<Post> {
    return this.roomModel
      .findById(_id)
      .populate('createdBy users')
      .exec();
  }
}
