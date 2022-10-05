import mongoose, { model, Model, Schema } from 'mongoose';
import {IShowreelDocument} from '@showreel/interfaces/showreel.interface';

const showreelSchema: Schema = new Schema (
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    username: { type: String },
    title: { type: String, default: ''},
    timeline: { type: String, default: '' },
    description: { type: String, default: '' },
    url: { type: String, default: '' },
    privacy: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
  }
);

const ShowreelModel: Model<IShowreelDocument> = model<IShowreelDocument>('Showreel', showreelSchema, 'Showreel');

export {ShowreelModel};
