import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
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
      title: doc.title,
      body: doc.body,
      owner: doc.owner,
    }));
  }

  async getDocumentById(id: string) {
    let doc;
    try {
      doc = await this.documentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException();
    }
    if (!doc) {
      throw new NotFoundException();
    } else {
      return doc;
    }
  }

  async getDocumentByOwner(owner: string) {
    const docs = await this.documentModel.find({ owner: owner }).exec();
    return docs.map(doc => ({
      id: doc.id,
      body: doc.body,
      owner: doc.owner,
    }));
  }

  async updateDocument(id: string, update: documentDTO) {
    const doc = await this.getDocumentById(id);
    if (update.title) {
      doc.title = update.title;
    }
    if (update.body) {
      doc.body = update.body;
    }
    doc.save();
  }

  async deleteDocument(id: string) {
    const del = await this.documentModel.deleteOne({ _id: id }).exec();
    if (del.n === 0) {
      throw new NotFoundException();
    }
  }
}
