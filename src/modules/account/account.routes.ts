import { Router } from "express";
import { AddResume } from "./resume.module";
import { AddPersonalInfo } from "./profile.module";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { AddEducation } from "./education.module";
import { AddCareer } from "./career.module";
import { multerUploadMemoryStorage } from "../../services/upload.service";

const router = Router();

router.route("/resume").post(authMiddleware,  multerUploadMemoryStorage.single("resume"), AddResume);
router.route("/personalInfo").post(authMiddleware,  multerUploadMemoryStorage.single("pictureUrl"), AddPersonalInfo);
router.route("/career").post(authMiddleware, AddCareer);
router.route("/education").post(authMiddleware, AddEducation);

export default router;
