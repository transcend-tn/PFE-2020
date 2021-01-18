import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestSchema } from './request.model';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationSchema } from '../collaboration/collaboration.model';
import { VoteSchema } from 'src/vote/vote.model';
import { CommentSchema } from 'src/comment/comment.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
      { name: 'Collaboration', schema: CollaborationSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Vote', schema: VoteSchema },
    ]),
  ],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}