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
import { DocumentCreate } from '@tr/common';
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
    const doc = await this.documentService.createDocument(user, document);
    return doc;
  }

  @Get()
  async getDocument() {
    const doc = await this.documentService.getDocument();
    return doc;
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    const doc = await this.documentService.getDocumentById(id);
    return { id: doc.id, title: doc.title, body: doc.body };
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
    @Body() doc: DocumentCreate,
  ) {
    await this.documentService.updateDocument(user, id, doc);
    return null;
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    await this.documentService.deleteDocument(id);
    return null;
  }
}
