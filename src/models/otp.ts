import mongoose from "mongoose";

const OTPCodeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: Number, required: true },
    sended: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

OTPCodeSchema.index({ code: "text" });

OTPCodeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const OTPCode = mongoose.model("OTPCode", OTPCodeSchema);

export default OTPCode;
