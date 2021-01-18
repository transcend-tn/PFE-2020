import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { VoteController } from './vote.controller';
import { VoteSchema } from './vote.model';
import { VoteService } from './vote.service';
import { CollaborationSchema } from '../collaboration/collaboration.model';
import { RequestSchema } from '../request/Request.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Vote', schema: VoteSchema },
      { name: 'Collaboration', schema: CollaborationSchema },
      { name: 'Request', schema: RequestSchema }
    ]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
