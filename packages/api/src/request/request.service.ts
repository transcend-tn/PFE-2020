import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './Request.model';
import { User } from '../users/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private readonly requestModel: Model<Request>,
  ) {}

  async createRequest(currentUser: User, id: string, body: string) {
    let request = new this.requestModel();
    request.documentId = id;
    request.userId = currentUser.id;
    request.body = body;
    return await request.save();
  }
}
