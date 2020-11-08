import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteRepository } from './favorite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from '../document/document.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteRepository]),
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
    UsersModule
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule {}
