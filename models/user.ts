import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    activities: object[];
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  activities: {
    type: [Object],
    default: [],
  },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
