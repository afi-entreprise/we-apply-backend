import { Storage } from "@google-cloud/storage";
import path from "path";


const serviceAccountPath = path.join(__dirname, "../gcp-key.json");

if (!serviceAccountPath) {
  throw new Error(
    "Le chemin du fichier de clé de compte de service est introuvable."
  );
}

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: serviceAccountPath,
});

export const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);
