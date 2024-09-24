import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "formidable";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handle(req, res) {
  const form = formidable({
    uploadDir: "./tmp",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }
    const file = files.file[0];
    try {
      const s3client = new S3Client({
        region: "eu-north-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      });
      const ext = file.originalFilename.split(".").pop();
      const newFileName = uniqid() + "." + ext;
      const bucketName = "ecommerce2-michal";
      const buffer = fs.readFileSync(file.filepath);

      await s3client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          ACL: "public-read",
          ContentType: file.mimetype,
          Body: buffer,
        })
      );
      fs.unlinkSync(file.filepath);
      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

      return res.status(200).json(fileUrl);
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
}
