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
    private userRepository: UserRepository,
  ) {}

  async collaborationTeam(id: string) {
    const collaborations = await this.collaborationModel.find();
    let ids:string[]=[]
    collaborations.map((collaboration)=>{
      ids.push(collaboration.userId);
    })
    return await this.userRepository.findByIds(ids);

  }

  async joinTeam(currentUser: User, id: string) {
    const collaboration = new this.collaborationModel();
    collaboration.userId = currentUser.id;
    collaboration.documentId = id;
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
      .findOne({ userId: currentUser.id, documentId: id })
      .exec();
  }
}
