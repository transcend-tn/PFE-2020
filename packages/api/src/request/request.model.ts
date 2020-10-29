import * as mongoose from 'mongoose';

export interface Request extends mongoose.Document {
  documentId: string;
  userId: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RequestSchema = new mongoose.Schema(
  {
    documentId: { type: String },
    userId: { type: String },
    title: { type: String },
    body: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
