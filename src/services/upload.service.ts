import multer, { diskStorage } from "multer";

export const multerUploadMemoryStorage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // no larger than 5mb
});
