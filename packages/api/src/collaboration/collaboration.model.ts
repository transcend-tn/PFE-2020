import * as mongoose from 'mongoose';

export interface Collaboration extends mongoose.Document {
  userId: string;
  documentId:string;
  createdAt: Date;
  updatedAt: Date;
}

export const CollaborationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    documentId: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
