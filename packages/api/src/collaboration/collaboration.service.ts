import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collaboration } from './collaboration.model';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectModel('Collaboration')
    private readonly collaborationModel: Model<Collaboration>,
  ) {}
}
