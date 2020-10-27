import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';

import { User } from '../users/user.entity';
import { CommentCreate } from '@tr/common';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
      ) {}

      async addComment(comment:CommentCreate, currentUser:User, id:string)
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
}
