import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './vote.model';

@Injectable()
export class VoteService {
    constructor(
        @InjectModel('Vote') private readonly voteModel: Model<Vote>,
      ) {}
}
