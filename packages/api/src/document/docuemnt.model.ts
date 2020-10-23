import * as mongoose from 'mongoose';

export interface Document extends mongoose.Document {
  title: string;
  body: string;
  owner: string;
}

export const DocumentSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  owner: { type: String },
});
