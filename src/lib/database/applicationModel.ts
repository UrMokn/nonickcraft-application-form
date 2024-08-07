import { type Model, Schema, model, models } from 'mongoose';
import { snowflake } from './util';

export interface IApplicationSchema {
  userId: string;
  java: string;
  bedrock: string;
}

export const applicationSchema = new Schema<IApplicationSchema>({
  userId: { ...snowflake, required: true, unique: true },
  java: Schema.Types.String,
  bedrock: Schema.Types.String,
});

export default models?.applications
  ? (models.applications as Model<IApplicationSchema>)
  : model('applications', applicationSchema);
