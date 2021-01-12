import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentCreate, DocumentUpdate } from '@tr/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('document')
@UseGuards(AuthGuard())
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  async createDocument(
    @GetUser() user: User,
    @Body() document: DocumentCreate,
  ) {
     return await this.documentService.createDocument(user, document);
  }

  @Get()
  async getDocument() {
    const doc = await this.documentService.getDocument();
    return doc;
  }

  @Get('collaboration-requests')
  async getCollaborationRequests(@GetUser() currentUser: User,) {
    return await this.documentService.getCollaborationRequests(currentUser.id);
  }

  @Get('followers')
  async getFollowers(@GetUser() currentUser: User,) {
    return await this.documentService.getFollowers(currentUser.id);
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    const doc = await this.documentService.getDocumentById(id);
    return doc;
  }

  @Get('/owner/:id')
  async getDocumentByOwner(@Param('id') id: string) {
    const docs = await this.documentService.getDocumentByOwner(id);
    return docs;
  }

  @Put(':id')
  async updateDocument(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() doc: DocumentUpdate,
  ) {
    await this.documentService.updateDocument(user, id, doc);
    return null;
  }

  @Delete(':id')
  async deleteDocument(@GetUser() user: User, @Param('id') id: string) {
    await this.documentService.deleteDocument(user, id);
    return null;
  }

  @Get('/isowner/:id')
  async isOwner(@GetUser() currentUser:User, @Param('id') id: string) {
    return await this.documentService.isOwner(currentUser, id);
  }
}
