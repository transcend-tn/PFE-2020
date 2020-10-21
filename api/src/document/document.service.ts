import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './docuemnt.model';
import { documentDTO } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document') private readonly documentModel: Model<Document>,
  ) {}

  async createDocument(doc: documentDTO) {
    const newDocument = new this.documentModel(doc);
    return await newDocument.save();
  }

  async getDocument() {
    const docs = await this.documentModel.find().exec();
    return await docs.map(doc => ({
      id: doc.id,
      body: doc.body,
      owner: doc.owner,
    }));
  }
}
