import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteRepository)
        private favoriteRepository: FavoriteRepository
    ) { }
}
