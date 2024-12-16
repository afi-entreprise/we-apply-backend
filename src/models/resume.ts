import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  LinkedinUrl: { type: String, required: true },
  PortfolioUrl: { type: String, required: false },
  Resume: { type: String, required: false },
  CoverLetter: { type: String, required: true },
});

ResumeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
