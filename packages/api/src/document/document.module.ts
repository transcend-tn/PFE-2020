import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './document.model';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { UsersModule } from '../users/users.module';
import { CollaborationSchema } from '../collaboration/collaboration.model';
import { UserRepository } from '../users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestSchema } from '../request/request.model';
import { VoteSchema } from '../vote/vote.model';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserRepository]),
    MongooseModule.forFeature([
      { name: 'Document', schema: DocumentSchema },
      { name: 'Collaboration', schema: CollaborationSchema },
      { name: 'Request', schema: RequestSchema },
      { name: 'Vote', schema: VoteSchema }
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
