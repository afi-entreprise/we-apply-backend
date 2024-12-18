import { Request, Response, Router } from "express";
import Resume from "../../models/resume";
import User from "../../models/User";
import uploadFileStreamToBucket from "../../utils/uploadFileStreamToBucket";
import uploadFileToBucket from "../../utils/uploadFileToBucket";

export const AddResume = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const { linkedinUrl, portfolioUrl, coverLetter, userId } = req.body;
    const file = req.file;
    if (!file) {
      console.log(file)
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      console.log(user);
      return;
    }

    console.log(user);

    console.log("test");
    const pdfUrl = await uploadFileToBucket(file);
    console.log("test5");
    console.log("ddd", pdfUrl);
    const newResume = new Resume({
      userId,
      linkedinUrl,
      portfolioUrl,
      resume: (pdfUrl as { url: string }).url,
      coverLetter,
    });
    await newResume.save();
    return res.status(201).json({ message: "Resume created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
