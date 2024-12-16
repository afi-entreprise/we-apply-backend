import { Request, Response, Router } from "express";
import Resume from "../../models/resume";
import User from "../../models/User";

export const AddResume = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const { LinkedinUrl, PortfolioUrl, CoverLetter, userId } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      console.log(user);
      return;
    }
    const newResume = new Resume({
      userId,
      LinkedinUrl,
      PortfolioUrl,
      CoverLetter,
    });
    await newResume.save();
    return res.status(201).json({ message: "Resume created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
