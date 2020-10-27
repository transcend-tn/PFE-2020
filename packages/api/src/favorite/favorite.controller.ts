import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { FavoriteService } from './favorite.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post(':id')
  @UseGuards(AuthGuard())
  addFavorite(@GetUser() currentUser: User, @Param('id') id:string) {
    return this.favoriteService.addFavorite(currentUser, id);
  }

  
}
