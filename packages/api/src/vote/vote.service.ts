import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './vote.model';
import { User } from '../users/user.entity';
import { Collaboration } from '../collaboration/collaboration.model';
import { Request } from '../request/request.model';
import { RequestService } from '../request/request.service';
import { CollaborationService } from '../collaboration/collaboration.service';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class VoteService {
    constructor(
        @InjectModel('Vote') private readonly voteModel: Model<Vote>,
        @InjectModel('Collaboration')
        private readonly collaborationModel: Model<Collaboration>,
        @InjectModel('Request')
        private readonly requestModel: Model<Request>,
      ) {}

      async getVoteStats(id:string, currentUser:User)
      {
        const docId = await new RequestService(this.requestModel).getDocId(id);
        const voteCount = await this.voteModel.find({requestId:id}).count();
        const teamCount = await new CollaborationService(this.collaborationModel).teamCount(docId);
        const voted =  await this.voted(id, currentUser)
        return {voteCount:voteCount, teamCount:teamCount, voted:voted}
      }  

    async addVote(id:string, currentUser:User)
    {   
        const docId = await new RequestService(this.requestModel).getDocId(id);
        const isMember = await new CollaborationService(this.collaborationModel).isMember(currentUser,docId);
        
        if(await this.voted(id, currentUser))
        {throw new UnauthorizedException("You are not allowed to voted");}
        if(isMember)
       { const newVote= new this.voteModel();
        newVote.userId = currentUser.id;
        newVote.requestId = id;
        await newVote.save();
        const voteCount = await this.voteModel.find({requestId:id}).count();
        const teamCount = await new CollaborationService(this.collaborationModel).teamCount(docId);
 
        return {voteCount:voteCount, teamCount:teamCount}}
        else
        throw new UnauthorizedException("You are not a member of this team");
    }

    async voted(id:string, currentUser:User) {
        const voted = await this.voteModel.find({userId: currentUser.id, requestId:id});
        return voted.length>0?true:false;
    }

    
    async cancelVote(id:string, currentUser:User)
    {
      const del = await this.voteModel.deleteOne({ requestId: id, userId: currentUser.id}).exec();
      if (del.n === 0) {
        throw new NotFoundException();
      }
    }
}
