import { Request, Response, Router } from "express";
import Education from "../../models/education";
import User from "../../models/User";

export const AddEducation = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log(req.body);
    const {
      educationLevel,
      field,
      skills,
      certifications,
      qualification,
      userId,
    } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const newEducation = new Education({
      userId,
      educationLevel,
      field,
      skills,
      certifications,
      qualification,
    });
    await newEducation.save();
    await user.updateOne({ etat: "dashboard" });
    return res.status(201).json({ message: "Education created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
