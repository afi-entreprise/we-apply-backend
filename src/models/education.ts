import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  EducationLevel: { type: String, required: true },
  Field: { type: String, required: true },
  Skills: { type: Array, required: true },
  Certifications: { type: Array, required: true },
  qualification: { type: String, required: false },
});

EducationSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Education = mongoose.model("Education", EducationSchema);

export default Education;
