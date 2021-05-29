import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RoomEntity extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop()
  createdBy?: string;
}

export type RoomDocument = RoomEntity & Document;
export const RoomEntitySchema = SchemaFactory.createForClass(RoomEntity);
