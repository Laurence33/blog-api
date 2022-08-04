import { Response } from "express";

export function internalServerError(res: Response, message: string) {
  return res.status(500).json({ error: true, message });
}
