import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  educationLevel: { type: String, required: true },
  field: { type: String, required: true },
  skills: { type: Array, required: true },
  certifications: { type: Array, required: true },
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
