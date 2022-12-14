import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/TokenService";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // 1. get the token from header
  const accessToken = req.headers["x-auth-token"] as string;
  if (!accessToken) {
    res.removeHeader("x-auth-token");
    return res
      .status(403)
      .json({ error: true, message: "You are not logged in." });
  }

  // 2. verify the header
  const decoded = verifyToken(accessToken) as JwtPayload;
  if (!decoded) {
    res.removeHeader("x-auth-token");
    return res.status(403).json({ error: true, message: "Invalid token." });
  }

  // 3. set the userid to req.body
  req.body["uid"] = decoded.id;
  // 4. next()

  next();
}
