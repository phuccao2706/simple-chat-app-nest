import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

export interface User2 extends Document {
  username: string;
  createdAt: Date;
}
