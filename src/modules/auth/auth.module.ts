import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/User";

const router = Router();

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
    );

    const userId = newUser._id;
    return res
      .status(201)
      .json({ message: "User created successfully", token, userId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("fail");
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
    );

    const userId = user._id;

    return res.status(200).send({ message: "Login successful", token, userId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGoogleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log(req.body);
    const { fullname, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const userId = user._id;
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "5h" }
      );
      res.status(201).json({ message: "Email already exists", token, userId });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      fullname,
      email,
      password: hashedPassword,
      provider: "google",
    });
    user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
    );

    const userId = user._id;
    return res
      .status(201)
      .json({ message: "User created successfully", token, userId });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

export default router;
