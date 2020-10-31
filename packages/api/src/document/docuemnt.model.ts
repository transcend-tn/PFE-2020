import * as mongoose from 'mongoose';

export interface Document extends mongoose.Document {
  title: string;
  body: object;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String },
    body: Object,
    owner: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
