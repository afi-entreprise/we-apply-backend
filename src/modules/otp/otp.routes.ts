import { Router } from "express";
import { requestOtpCode, verifyOtpCode } from "./otp.module";

// Router
const router = Router();

router.route("/request").post(requestOtpCode);
router.route("/verify").post(verifyOtpCode);

export default router;
