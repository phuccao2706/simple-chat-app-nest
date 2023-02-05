import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/types/user';

export const PostSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Post', PostSchema);

export interface Post extends Document {
  title: string;
  image: string;
  description: string;
  createdBy: User;
  createdAt: Date;
}
