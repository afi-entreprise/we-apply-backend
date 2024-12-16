import { Request, Response, Router } from "express";

import authRouter from "../modules/auth/auth.routes";
import optRouter from "../modules/otp/otp.routes";
import accountRouter from "../modules/account/account.routes";
const router = Router();

// API AUTHORIZATION
// router.use(verifyAuthorization);

router.use("/auth", authRouter);
router.use("/otp", optRouter);
router.use("/account", accountRouter);

// ? Not found route
router.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Url Not Found" });
});

export default router;
