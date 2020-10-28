import { Module } from '@nestjs/common';
import { CollaborationController } from './collaboration.controller';
import { CollaborationService } from './collaboration.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CollaborationSchema } from './collaboration.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Collaboration', schema: CollaborationSchema },
    ]),
  ],
  controllers: [CollaborationController],
  providers: [CollaborationService],
})
export class CollaborationModule {}
