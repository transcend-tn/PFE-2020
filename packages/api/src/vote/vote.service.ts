import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './vote.model';
import { User } from '../users/user.entity';

@Injectable()
export class VoteService {
    constructor(
        @InjectModel('Vote') private readonly voteModel: Model<Vote>,
      ) {}

    async addVote(id:string, currentUser:User)
    {
        const newVote= new this.voteModel();
        newVote.userId = currentUser.id;
        newVote.requestId = id;
        await newVote.save();
        return await this.voteModel.find({requestId:id}).count();
    }
}
