import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './document.model';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { UsersModule } from '../users/users.module';
import { CollaborationSchema } from '../collaboration/collaboration.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }]),
    MongooseModule.forFeature([
      { name: 'Collaboration', schema: CollaborationSchema },
  ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
