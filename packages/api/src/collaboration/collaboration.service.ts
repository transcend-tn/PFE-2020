import { ConflictException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Document } from '../document/document.model';
import { DocumentService } from '../document/document.service';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';
import { Collaboration } from './collaboration.model';

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
    const ids: string[] = collaborations.map(
      collaboration => collaboration.userId,
    );
    let doc: Document;
    if (documentId) {
      try {
        doc = await this.documentModel.findById(documentId);
      } catch (error) {
        console.log(error);
      }
    }

    const usersByIds = await this.userRepository.findByIds(ids);
    return !!usersByIds.length ? { [doc.title+"#"+doc._id]: usersByIds } : null;
  }

  async joinTeam(currentUser: User, id: string, isOwner: boolean) {
    const collaboration = new this.collaborationModel();
    collaboration.userId = currentUser.id;
    collaboration.documentId = id;
    collaboration.state = isOwner;
    if(await this.collaborationModel.findOne({documentId: id, userId:currentUser.id}))
    {throw new ConflictException('You already requested to join this team');}
    if (await this.isMember(currentUser, id)) {
      throw new ConflictException('You are already a member of this team');
    } else {
      return await collaboration.save();
    }
  }

  async leaveTeam(currentUser: User, id: string) {
    if (
     ! await new DocumentService(
        this.documentModel,
        this.collaborationModel,
        this.userRepository,
      ).isOwner(currentUser, id)
    ){
     
  
    const del = await this.collaborationModel
      .deleteOne({ userId: currentUser.id, documentId: id })
      .exec();
    if (del.n === 0) {
      throw new NotFoundException();
    }
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

  async getDocuments(userId: string) {
    const docs= await this.collaborationModel.find({ userId , state: true })
    const docIds = docs.map(doc=>doc.documentId)
    return await new DocumentService(
      this.documentModel,
      this.collaborationModel,
      this.userRepository,
    ).getDocumentByIds(docIds)
      
  }
}
