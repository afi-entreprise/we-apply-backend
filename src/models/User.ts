import { Schema, model, Document } from "mongoose";

// Interface
export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  provider: string;
}


const UserSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  provider: { type: String, default: "email" },
});

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
