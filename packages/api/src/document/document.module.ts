import { Module } from '@nestjs/common'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { DocumentSchema } from './document.model'; 
import { DocumentController } from './document.controller'; 
import { DocumentService } from './document.service'; 
import { UsersModule } from '../users/users.module'; 
import { CollaborationSchema } from '../collaboration/collaboration.model'; 
import { UserRepository } from '../users/user.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { RequestSchema } from '../request/request.model'; 
import { VoteSchema } from '../vote/vote.model'; 
import { CommentSchema } from '../comment/comment.model';
 
@Module({ 
  imports: [ 
    UsersModule, 
    TypeOrmModule.forFeature([UserRepository]), 
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]), 
    MongooseModule.forFeature([{ name: 'Collaboration', schema: CollaborationSchema }]), 
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]), 
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), 
  ], 
  controllers: [DocumentController], 
  providers: [DocumentService], 
}) 
export class DocumentModule {} 
