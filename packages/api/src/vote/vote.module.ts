import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './vote.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
  ],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
