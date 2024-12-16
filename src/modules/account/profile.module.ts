import { Request, Response, Router } from "express";
import Profile from "../../models/profile";
import User from "../../models/User";

export const AddPersonalInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      FirstName,
      LastName,
      About,
      Address,
      PhoneNumber,
      Email,
      BirthDay,
      userId,
    } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const newPersonnalInfo = new Profile({
      userId,
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Address,
      BirthDay,
      About,
    });
    await newPersonnalInfo.save();
    return res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
