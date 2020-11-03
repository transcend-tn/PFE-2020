import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';

import { User } from '../users/user.entity';
import { CommentCreate } from '@tr/common';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        private userRepository?: UserRepository,
      ) {}

      async documentComment(comment:CommentCreate, currentUser:User, id:string)
      {
          const newComment = new this.commentModel(comment);

          newComment.userId = currentUser.id;
          newComment.body = comment.body;
          newComment.documentId = id;
          const response=  await newComment.save();
          return {
            id : response._id, 
            userId: response.userId, 
            documentId: response.documentId, 
            body: response.body, 
            createdAt: response.createdAt}
          
      }

      async getCommentByDocId(id: string) {
        let comments=  await this.commentModel.find({documentId: id})
        let data = Promise.all(comments.map(async (comment)=>
        {
          const user= await new UsersService(this.userRepository,null).getUserById(comment.userId)
          return {username: user.username, img: user.img, body: comment.body, createdAt: comment.createdAt}
        }))
        return data;
      }

      async getCommentByReqId(id: string) {
        return await this.commentModel.find({requestId: id})
      }

      async requestComment(comment:CommentCreate, currentUser:User, id:string)
      {
          const newComment = new this.commentModel(comment);

          newComment.userId = currentUser.id;
          newComment.body = comment.body;
          newComment.requestId = id;
          const response=  await newComment.save();
          return {
            id : response._id, 
            userId: response.userId, 
            requestId: response.requestId, 
            body: response.body, 
            createdAt: response.createdAt}
          
      }
}
