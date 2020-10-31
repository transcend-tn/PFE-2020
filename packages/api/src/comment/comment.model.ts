import * as mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
  body: string;
  userId: string;
  documentId:string;
  requestId:string;
  createdAt: Date;
  updatedAt: Date;
}

export const CommentSchema = new mongoose.Schema(
  {
    body: { type: String },
    userId: { type: String },
    documentId: { type: String },
    requestId: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
