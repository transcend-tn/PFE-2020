import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './Request.model';
import { User } from '../users/user.entity';
import { RequestCreate } from '@tr/common';
import { Collaboration } from '../collaboration/collaboration.model';
import { CollaborationService } from '../collaboration/collaboration.service';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { Comment } from '../Comment/Comment.model';
import { Vote } from '../Vote/Vote.model';
@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private readonly requestModel: Model<Request>,
    @InjectModel('Collaboration') private readonly collaborationModel?: Model<Collaboration>,
    @InjectModel('Comment') private readonly commentModel?: Model<Comment>,
    @InjectModel('Vote') private readonly voteModel?: Model<Vote>,
  ) {}

  async createRequest(currentUser: User, id: string, newRequest: RequestCreate) {
    const isMember = await new CollaborationService(this.collaborationModel).isMember(currentUser, id);
    if (isMember)
    { let request = new this.requestModel();
    request.documentId = id;
    request.userId = currentUser.id;
    request.title = newRequest.title;
    request.body = newRequest.body;
    return await request.save();

    }else
    throw new UnauthorizedException('You have to be a member of the team to create a request')
   
  }

  async getRequest(id: string) {
    return (await this.requestModel.find({documentId:id})).reverse()
  }

  async getDocId(id:string)
  {
    const req = await this.requestModel.findById(id);
    return req.documentId;
  }

  async getRequestDetail(id: string) {
    return await this.requestModel.findById(id);
  }

  async deleteRequest(currentUser:User, id:string)
  {  
    const del = await this.requestModel.deleteOne({ _id: id}).exec();
    await this.commentModel.deleteMany({requestId:id});
    await this.voteModel.deleteMany({requestId:id})
    if (del.n === 0) {
      throw new NotFoundException();
    }
  }
}
