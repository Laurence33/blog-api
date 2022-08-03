import { Response } from "express";

export function internalServerError(res: Response) {
  return res
    .status(500)
    .json({ error: true, message: "Internal Server Error" });
}