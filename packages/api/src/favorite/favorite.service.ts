import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Document } from '../document/document.model';
import { User } from '../users/user.entity';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
    @InjectModel('Document') private readonly documentModel: Model<Document>,
  ) {}

  async getFavorite(currentUser: User) {
    let favs = {};
    const data = await this.favoriteRepository.find({ userId: currentUser.id });
    favs = Promise.all(
      data.map(
        async f => await this.documentModel.findOne({ _id: f.documentId }),
      ),
    );
    return favs;
  }
  async addFavorite(currentUser: User, id: string) {
    let newFavorite = this.favoriteRepository.create();

    newFavorite.userId = currentUser.id;
    newFavorite.documentId = id;
    try {
      await this.favoriteRepository.save(newFavorite);
    } catch (error) {
      return error;
    }

    return newFavorite;
  }

  async removeFavorite(id: string) {
    await this.favoriteRepository.delete({ id });
    return { deleted: id };
  }
}
