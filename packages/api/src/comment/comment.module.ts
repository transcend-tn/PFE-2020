import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
