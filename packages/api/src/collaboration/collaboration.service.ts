import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.entity';
import { Collaboration } from './collaboration.model';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectModel('Collaboration')
    private readonly collaborationModel: Model<Collaboration>,
    @InjectRepository(UserRepository)
    private userRepository?: UserRepository,
  ) {}

  async collaborationTeam(documentId: string) {
    const collaborations = await this.collaborationModel.find({documentId, state:true});
    const ids:string[]=collaborations.map((collaboration)=>collaboration.userId)
    return await this.userRepository.findByIds(ids);

  }

  async collaborationRequests(documentId: string) {
    const collaborations = await this.collaborationModel.find({documentId, state:false});
/*     const result= { [documentId]: collaborations.map(async (c)=>await this.userRepository.findOne(c.userId)) }
    return result */
    const ids:string[]=collaborations.map((collaboration)=>collaboration.userId)
    return {[documentId]: await this.userRepository.findByIds(ids)}

  }


  async joinTeam(currentUser: User, id: string, isOwner:boolean) {
    const collaboration = new this.collaborationModel();
    collaboration.userId = currentUser.id;
    collaboration.documentId = id;
    collaboration.state = isOwner;
    if (await this.isMember(currentUser, id)) {
      throw new ConflictException('You are already a member of this team');
    } else {
      return await collaboration.save();
    }
  }

  async leaveTeam(currentUser: User, id: string) {
    const del = await this.collaborationModel
      .deleteOne({ userId: currentUser.id, documentId: id })
      .exec();
    if (del.n === 0) {
      throw new NotFoundException();
    }
  }

  async isMember(currentUser: User, id: string) {
    return await this.collaborationModel
      .findOne({ userId: currentUser.id, documentId: id, state:true })
      .exec();
  }

  async teamCount(id:string)
  {
    return await this.collaborationModel.find({documentId:id , state:true}).count();
  }

  async enable(userId:string, docId:string)
  {
    const user = await this.collaborationModel.findOne({documentId:docId , userId:userId})
    user.state = true;
    await user.save();
    return user;
  }

  async disable(userId:string, docId:string)
  {
    const user = await this.collaborationModel.findOne({documentId:docId , userId:userId})
    user.state = false;
    await user.save();
    return user;
  }
}
