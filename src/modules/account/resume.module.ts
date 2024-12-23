import { Request, Response, Router } from "express";
import Resume from "../../models/resume";
import User from "../../models/User";
import uploadFileStreamToBucket from "../../utils/uploadFileStreamToBucket";
import uploadFileToBucket from "../../utils/uploadFileToBucket";

export const AddResume = async (req: Request, res: Response): Promise<any> => {
  try {
    const { linkedinUrl, portfolioUrl, coverLetter, userId } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      console.log(user);
      return;
    }

    const pdfUrl = await uploadFileToBucket(file);

    const newResume = new Resume({
      userId,
      linkedinUrl,
      portfolioUrl,
      resume: (pdfUrl as { url: string }).url,
      coverLetter,
    });
    await newResume.save();
    await user.updateOne({ etat: "personalInfo" })
    return res.status(201).json({ message: "Resume created successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};
