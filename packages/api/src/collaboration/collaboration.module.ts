import { Module } from '@nestjs/common';
import { CollaborationController } from './collaboration.controller';
import { CollaborationService } from './collaboration.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationSchema } from './collaboration.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { DocumentSchema } from '../document/document.model';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserRepository]),
    MongooseModule.forFeature([{ name: 'Collaboration', schema: CollaborationSchema },]),
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
  ],
  controllers: [CollaborationController],
  providers: [CollaborationService],
})
export class CollaborationModule {}
