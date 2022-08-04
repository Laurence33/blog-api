import { NextFunction, Request, Response } from "express";

export async function removeUnsupportedFilter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allowedQuery = ["keyword", "limit", "startDate", "endDate"];
  for (const [key, value] of Object.entries(req.query)) {
    if (!allowedQuery.includes(key)) {
      delete req.query[key];
    }
  }
  next();
}
