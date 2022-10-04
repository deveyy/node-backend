import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface IShowreelDocument extends Document {
  _id?: | mongoose.Types.ObjectId;
  userId: string;
  username: string;
  title: string;
  timeline: string;
  description: string;
  url?: string;
  privacy?: string;
  createdAt?: Date;
}

export interface IGetShowreelQuery {
  _id?: ObjectId | string;
  username?: string;
  title: string;
  timeline: string;
  description: string;
  url?: string;
  createdShowreel: IShowreelDocument;
}

export interface ISaveShowreelToCache {
  key: ObjectId | string;
  currentUserId: string;
  uId: string;
  createdShowreel: IShowreelDocument;
}

export interface IShowreelJobData {
  key?: string;
  value?: string | IShowreelDocument;
  keyOne?: string;
  keyTwo?: string;
}

export interface IQueryComplete {
  ok?: number;
  n?: number;
}

export interface IQueryDeleted {
  deletedCount?: number;
}
