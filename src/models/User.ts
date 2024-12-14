import { Schema, model, Document } from "mongoose";

// Interface
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
}

// Mongoose Schema
const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
