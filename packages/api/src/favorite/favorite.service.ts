import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteRepository)
    private favoriteRepository: FavoriteRepository,
  ) {}

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
}
