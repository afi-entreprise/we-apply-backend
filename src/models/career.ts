import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: { type: String, required: true },
    numberExperience: { type: Number, required: true },
    currentEmployee: { type: String, required: true },
    desiredJob: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    avaibility: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

CareerSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Career = mongoose.model("Career", CareerSchema);

export default Career;
