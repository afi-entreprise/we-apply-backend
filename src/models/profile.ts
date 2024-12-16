import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Address: { type: String, required: true },
  BirthDay: { type: Date, required: true },
  About: { type: String, required: true },
  PictureUrl: { type: String, required: false },
});

ProfileSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
