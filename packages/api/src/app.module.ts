import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb',
    ),
    DocumentModule,
  ],
})
export class AppModule {}