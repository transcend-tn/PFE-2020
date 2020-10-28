import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestSchema } from './request.model';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
