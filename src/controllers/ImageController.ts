import dotenv from "dotenv";
import { Request, Response } from "express";

import { internalServerError } from "../utils/500response";
import { MongoClient, GridFSBucket } from "mongodb";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGODB_SERVER as string);

export async function downloadImage(req: Request, res: Response) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(process.env.MONGODB_DATABASE);
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.MONGODB_IMG_BUCKET,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error: any) {
    internalServerError(res, error.message);
  }
}
