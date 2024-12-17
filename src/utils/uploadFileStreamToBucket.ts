import { Storage } from "@google-cloud/storage";
import sharp from "sharp";

const storage = new Storage();
const bucketName = process.env.GCLOUD_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

type FileType = {
  originalname: string;
  buffer: Buffer;
};

const uploadFileStreamToBucket = async (file: FileType) => {
  try {
    const isSvg = file.originalname.endsWith(".svg");
    const isPdf = file.originalname.endsWith(".pdf");

    let bufferToUpload = file.buffer;

    if (!isSvg && !isPdf) {
      bufferToUpload = await sharp(file.buffer)
        .resize(800, 600, { fit: "inside" })

        .jpeg({ quality: 80 })
        .toBuffer();
    }

    const sanitizedFileName = `${Date.now()}-${file.originalname.replace(
      /\s+/g,
      "-"
    )}`;

    const blob = bucket.file(sanitizedFileName);

    let contentType = "application/octet-stream"; // Valeur par défaut
    if (isPdf) {
      contentType = "application/pdf";
    } else if (isSvg) {
      contentType = "image/svg+xml";
    } else {
      contentType = "image/jpeg";
    }

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType,
    });

    return new Promise<{ url: string; name: string }>((resolve, reject) => {
      blobStream
        .on("finish", () => {
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
          resolve({ url: publicUrl, name: blob.name });
        })
        .on("error", (err) => {
          console.error("Erreur lors du téléchargement :", err);
          reject(err);
        })

        .end(bufferToUpload);
    });
  } catch (error) {
    console.error("Erreur dans uploadFileStreamToBucket :", error);
    throw new Error("Échec de l'upload du fichier ou de sa compression");
  }
};

export default uploadFileStreamToBucket;
