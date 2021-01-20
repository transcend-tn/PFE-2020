import * as mongoose from 'mongoose';

export interface Document extends mongoose.Document {
  title: string;
  body: object;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  _history: [{
    body: object,
    user: string,
    time: Date,
    status: String,
}]
}

export const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String },
    body: { type: Object },
    owner: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    _history: {type: [Object]}
  },
  {
    timestamps: true,
  },
);
