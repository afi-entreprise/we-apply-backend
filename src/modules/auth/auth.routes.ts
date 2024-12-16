import { Router } from "express";
import { login, register } from "./auth.module";

const router = Router();

router.route("/login").post(login);

router.route("/register").post(register);

export default router;