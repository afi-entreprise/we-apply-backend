import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    JobTitle: { type: String, required: true },
    NumberExperience: { type: Number, required: true },
    CurrentEmployee: { type: String, required: true },
    DesiredJob: { type: String, required: true },
    Industry: { type: String, required: true },
    Location: { type: String, required: true },
    Salary: { type: Number, required: true },
    Avaibility: { type: Date, required: true },
    Status: { type: String, required: true },
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
