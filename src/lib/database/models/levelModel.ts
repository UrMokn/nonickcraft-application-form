import { type Model, Schema, model } from 'mongoose';
import { snowflake } from './util';

export interface ILevelSchema {
  id: string;
  lv: number;
  xp: number;
  boost: number;
  last: Date;
}

interface ILevelMethods {
  addXP(boost: number, save?: boolean): { lv: number; xp: number; diff: number; oldLv: number };
}

export const levelSchema = new Schema<ILevelSchema>(
  {
    id: { ...snowflake, required: true, unique: true },
    lv: { type: Schema.Types.Number, default: 0, min: 0 },
    xp: { type: Schema.Types.Number, default: 0, min: 0 },
    boost: { type: Schema.Types.Number, default: 1, min: 0 },
    last: { type: Schema.Types.Date },
  },
  {
    versionKey: false,
  },
);
levelSchema.index({ id: 1 }, { name: 'id', unique: true });
levelSchema.index({ lv: -1, xp: -1 }, { name: 'level' });

export default model<ILevelSchema, Model<ILevelSchema, object, ILevelMethods>>(
  'levels',
  levelSchema,
);
