import { sendOTP, verifyOTP } from "../../utils/utils";
import { Request, Response } from "express";

// Request for otp code
export const requestOtpCode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, fullname } = req.body;
    const result = await sendOTP({ email, fullname });
    console.log(result);
    if (result) {
      return res.status(200).send({ message: "Otp code sent" });
    }
    return res.status(200).send({ message: "Otp code not sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

// Verify otp code
export const verifyOtpCode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, code } = req.body;
    const result: { message: string; valid: boolean } = await verifyOTP({
      email,
      code,
    });
    const valid = result.valid;
    if (!result) {
      return res.status(400).send({ message: "Pleasse retry after", valid });
    }
    if (result.valid) {
      return res.status(200).send({ message: "Otp code verified", valid });
    }
    return res.status(401).send({ message: result.message, valid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
