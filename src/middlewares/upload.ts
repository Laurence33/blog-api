import dotenv from "dotenv";
import { Request } from "express";
import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

// Load env variables
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI as string,
  options: { useNewUrlParser: true, useUnifiedTopology: true },

  file: (req: Request, file: any) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-blogApi-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: process.env.MONGODB_IMG_BUCKET as string,
      filename: `${Date.now()}-blogApi-${file.originalname}`,
    };
  },
});

// const uploadFiles = multer({ storage: storage }).single("file");
var uploadFiles = multer({ storage: storage }).array("file", 10);
export const uploadFilesMiddleware = util.promisify(uploadFiles);
