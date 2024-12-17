import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  linkedinUrl: { type: String, required: true },
  portfolioUrl: { type: String, required: false },
  resume: { type: String, required: false },
  coverLetter: { type: String, required: true },
});

ResumeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
