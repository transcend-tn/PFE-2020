import { Body, Controller, Post, Get } from '@nestjs/common';
import { DocumentService } from './document.service';
import { documentDTO } from './dto/document.dto';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  async createDocument(@Body() document: documentDTO) {
    const doc = await this.documentService.createDocument(document);
    return doc;
  }

  @Get()
  async getDocument() {
    const doc = await this.documentService.getDocument();
    return doc;
  }
}
