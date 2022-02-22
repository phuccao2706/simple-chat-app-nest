import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/types/user';
import { Payload } from 'src/types/payload';
import { AuthDTO } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(input: AuthDTO): Promise<User> {
    const user = await this.userModel.findOne({ username: input.username });

    console.log(user);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(input);
    return await createdUser.save();
  }

  async findByLogin(userDTO: AuthDTO) {
    const { username, password } = userDTO;

    const user = await this.userModel
      .findOne({ username })
      .select('username password createdAt');

    console.log(user);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
