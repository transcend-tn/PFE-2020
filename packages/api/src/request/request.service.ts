import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './Request.model';
import { User } from '../users/user.entity';
import { RequestCreate } from '@tr/common';
import { Collaboration } from '../collaboration/collaboration.model';
import { CollaborationService } from '../collaboration/collaboration.service';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private readonly requestModel: Model<Request>,
    @InjectModel('Collaboration')
    private readonly collaborationModel?: Model<Collaboration>,
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
}
