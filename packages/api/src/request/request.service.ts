import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './Request.model';
import { User } from '../users/user.entity';
import { RequestCreate } from '@tr/common';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private readonly requestModel: Model<Request>,
  ) {}

  async createRequest(currentUser: User, id: string, newRequest: RequestCreate) {
    let request = new this.requestModel();
    request.documentId = id;
    request.userId = currentUser.id;
    request.title = newRequest.title;
    request.body = newRequest.body;
    return await request.save();
  }

  async getRequest(id: string) {
    return await this.requestModel.find({documentId:id})
  }
}
