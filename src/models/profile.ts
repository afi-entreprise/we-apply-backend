import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  fastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  birthDay: { type: Date, required: true },
  about: { type: String, required: true },
  pictureUrl: { type: String, required: false },
});

ProfileSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
