import { Bucket } from "@google-cloud/storage";

// this file will help with uploading files to gcp bucket
const { Storage } = require("@google-cloud/storage");
const url = require("url");

const uploadFileToBucket = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    // Create a GCS client
    const storage = new Storage();
    const bucketName = process.env.GCLOUD_BUCKET_NAME;
    const bucket: Bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${file.originalname.replace(
      /\s+/g,
      "-"
    )}`;
    const gcsFile = bucket.file(gcsFileName);

    const stream = gcsFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    stream.on("error", (err: any) => {
      console.log(err, "stream error when uploading file");
      file.buffer = null;
      reject(err); // reject the promise on error
    });

    stream.on("finish", () => {
      file.buffer = null;

      // Get the file URL
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`;

      const parsedUrl = url.parse(fileUrl);
      const transformedUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

      resolve({ url: transformedUrl, name: gcsFileName }); // resolve with the file URL
    });

    stream.end(file.buffer);
  });
};

export default uploadFileToBucket;
// module.exports = uploadFileToBucket;
