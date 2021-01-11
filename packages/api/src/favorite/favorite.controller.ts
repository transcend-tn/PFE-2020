import { Controller, Delete, Param, Post, UseGuards, Get, Body } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { FavoriteService } from './favorite.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get(':id')
  getFavorite(@Param('id') id:string) {
    return this.favoriteService.getFavorite(id);
  }

  @Post()
  addFavorite(@GetUser() currentUser: User, @Body('id') id:string) {
    return this.favoriteService.addFavorite(currentUser, id);
  }

  @Delete(':id')
  removeFavorite(@GetUser() currentUser: User, @Param('id') id:string) {
    return this.favoriteService.removeFavorite(currentUser, id);
  }


  
}
