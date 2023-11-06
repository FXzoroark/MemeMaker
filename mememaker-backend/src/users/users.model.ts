import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = model<UserDocument>('User', UserSchema);


