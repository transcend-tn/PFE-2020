import * as mongoose from 'mongoose';

export interface Vote extends mongoose.Document {
  requestId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const VoteSchema = new mongoose.Schema(
  {
    requestId: { type: String },
    userId: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
