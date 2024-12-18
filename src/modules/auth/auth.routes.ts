import { Router } from "express";
import { login, register, handleGoogleLogin } from "./auth.module";

const router = Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/googleLogin").post(handleGoogleLogin);

export default router;
