import { Request, Response, Router } from "express";
import Career from "../../models/career";
import User from "../../models/User";

export const AddCareer = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const {
      jobTitle,
      numberExperience,
      currentEmployee,
      desiredJob,
      industry,
      location,
      salary,
      avaibility,
      status,
      userId,
    } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const newCareer = new Career({
      userId,
      jobTitle,
      numberExperience: parseInt(numberExperience),
      currentEmployee,
      desiredJob,
      industry,
      location,
      salary: parseInt(salary),
      avaibility: new Date(avaibility),
      status,
    });
    await newCareer.save();
    return res.status(201).json({ message: "Career created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
