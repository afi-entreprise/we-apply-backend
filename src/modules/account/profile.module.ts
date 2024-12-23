import { Request, Response, Router } from "express";
import Profile from "../../models/profile";
import User from "../../models/User";
import uploadFileToBucket from "../../utils/uploadFileToBucket";

export const AddPersonalInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      firstName,
      lastName,
      about,
      address,
      phoneNumber,
      email,
      birthDay,
      userId,
    } = req.body;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const picture = await uploadFileToBucket(file);
    console.log(picture);
    const newProfile = new Profile({
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      birthDay: new Date(birthDay),
      about,
      pictureUrl: (picture as { url: string }).url,
    });

    await newProfile.save();
    await user.updateOne({ etat: "career" })
    return res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
