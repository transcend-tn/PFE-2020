import { Controller, Delete, Param, Post, UseGuards, Get, Body } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { FavoriteService } from './favorite.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getFavorite(@GetUser() currentUser: User) {
    return this.favoriteService.getFavorite(currentUser);
  }

  @Post()
  addFavorite(@GetUser() currentUser: User, @Body('id') id:string) {
    return this.favoriteService.addFavorite(currentUser, id);
  }

  @Delete(':id')
  removeFavorite(@Param('id') id:string) {
    return this.favoriteService.removeFavorite(id);
  }


  
}
