import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { VoteController } from './vote.controller';
import { VoteSchema } from './vote.model';
import { VoteService } from './vote.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
