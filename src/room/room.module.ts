import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomEntity, RoomEntitySchema } from './room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomEntity.name, schema: RoomEntitySchema },
    ]),
  ],
  providers: [RoomResolver, RoomService],
})
export class RoomModules {}
