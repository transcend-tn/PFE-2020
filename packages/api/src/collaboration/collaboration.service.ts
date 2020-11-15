import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.entity';
import { Collaboration } from './collaboration.model';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../document/document.model';
import { DocumentService } from '../document/document.service';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectModel('Collaboration')
    private readonly collaborationModel: Model<Collaboration>,
    @InjectRepository(UserRepository)
    private userRepository?: UserRepository,
    @InjectModel('Document') private readonly documentModel?: Model<Document>,
  ) {}

  async collaborationTeam(documentId: string) {
    const collaborations = await this.collaborationModel.find({
      documentId,
      state: true,
    });
    const ids: string[] = collaborations.map(
      collaboration => collaboration.userId,
    );
    return await this.userRepository.findByIds(ids);
  }

  async collaborationRequests(documentId: string) {
    const collaborations = await this.collaborationModel.find({
      documentId,
      state: false,
    });
    /*     const result= { [documentId]: collaborations.map(async (c)=>await this.userRepository.findOne(c.userId)) }
    return result */
    const ids: string[] = collaborations.map(
      collaboration => collaboration.userId,
    );
    
    const usersByIds = await this.userRepository.findByIds(ids);
    return !!usersByIds.length ? {[documentId]: usersByIds} : null;
  }

  async joinTeam(currentUser: User, id: string, isOwner: boolean) {
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
      .findOne({ userId: currentUser.id, documentId: id, state: true })
      .exec();
  }

  async teamCount(id: string) {
    return await this.collaborationModel
      .find({ documentId: id, state: true })
      .count();
  }

  async enable(currentUser: User, userId: string, docId: string) {
    if (
      await new DocumentService(
        this.documentModel,
        this.collaborationModel,
        this.userRepository,
      ).isOwner(currentUser, docId)
    ) {
      const user = await this.collaborationModel.findOne({
        documentId: docId,
        userId: userId,
      });
      user.state = true;
      await user.save();
      return user;
    } else throw new UnauthorizedException('You need to be the owner');
  }

  async disable(currentUser: User, userId: string, docId: string) {
    if (
      await new DocumentService(
        this.documentModel,
        this.collaborationModel,
        this.userRepository,
      ).isOwner(currentUser, docId)
    ) {
    const user = await this.collaborationModel.findOne({
      documentId: docId,
      userId: userId,
    });
    user.state = false;
    await user.save();
    return user;
  } else throw new UnauthorizedException('You need to be the owner');
  }

  async remove(currentUser: User, userId: string, docId: string) {
    if (
      await new DocumentService(
        this.documentModel,
        this.collaborationModel,
        this.userRepository,
      ).isOwner(currentUser, docId)
    ) {
    const del = await this.collaborationModel
      .deleteOne({ userId: userId, documentId: docId })
      .exec();
    if (del.n === 0) {
      throw new NotFoundException();
    }
  } else throw new UnauthorizedException('You need to be the owner');
  }
}
