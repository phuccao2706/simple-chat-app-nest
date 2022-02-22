import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, User2 } from 'src/types/user';

export const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Room', RoomSchema);

export interface Room extends Document {
  name: string;
  description: string;
  createdBy: User;
  users: User[];
  createdAt: Date;
}
