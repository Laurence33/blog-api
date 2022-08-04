import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../services/HashService";
import {
  createNewLogin,
  findLoginByUsername,
  getLoginById,
} from "../services/LoginService";
import { createTokens, verifyToken } from "../services/TokenService";
import { internalServerError } from "../utils/500response";

export async function createLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    // 1. Check if the login exists
    const exists = await findLoginByUsername(username);
    console.log(exists);
    if (exists) {
      // login exists in the database
      return res
        .status(400)
        .json({ error: true, message: "Username already exists." });
    }
    // 2. Create a password hash
    const passwordDigest = await hashPassword(password);
    // 3. Create the login
    const user = await createNewLogin({
      ...req.body,
      passwordDigest: passwordDigest,
    });
    // 4. Save the new login
    // user.save();
    // 5. Return an OK response
    return res
      .status(200)
      .json({ error: false, message: "User has been created successfully." });
  } catch (error: any) {
    console.log(error);
    return internalServerError(res, error.message);
  }
}

export async function login(req: Request, res: Response) {
  const form = req.body;
  // 1. Check if login exists in database
  const foundLogin = await findLoginByUsername(form.username);

  if (!foundLogin) {
    return res
      .status(403)
      .json({ error: true, message: "Username or password incorrect." });
  }
  // 2. if Exists, compare password in the database
  const matched = await verifyPassword(
    foundLogin.passwordDigest,
    form.password
  );
  if (!matched) {
    return res
      .status(403)
      .json({ error: true, message: "Username or password incorrect." });
  }
  // 3. If password matches, create an AT and RT
  const tokenBody = {
    id: foundLogin._id,
    username: foundLogin.username,
  };
  const tokens = createTokens(tokenBody);
  if (tokens) {
    const { accessToken, refreshToken } = tokens;
    // 4. set AT to header and RT to cookie
    res.header("x-auth-token", accessToken);
    res.cookie("refresh-token", refreshToken, { httpOnly: true }); // add secure: true on prod
    // 5. return 200
    return res.status(200).json({
      error: false,
      message: "Login has been successful.",
    });
  }
  return res
    .status(500)
    .json({ error: true, message: "Something went wrong." });
}

export function logout(req: Request, res: Response) {
  res.removeHeader("x-auth-token");
  res.clearCookie("refresh-token");

  return res.sendStatus(204);
}

export async function refreshToken(req: Request, res: Response) {
  // Get refresh token from cookies
  const token = req.cookies["refresh-token"];
  // verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    res.clearCookie("refresh-token");
    return res.status(403).json({ error: true, message: "Invalid token." });
  }

  // Get user from database
  const user = await getLoginById(decoded.id);
  if (!user) {
    res.clearCookie("refresh-token");
    return res.status(403).json({ error: true, message: "User not found." });
  }
  // generate new token and refresh token
  const tokenBody = {
    id: user._id,
    username: user.username,
  };
  const tokens = createTokens(tokenBody);
  if (!tokens) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong, please try again.",
    });
  }
  // Set the tokens
  const { accessToken, refreshToken } = tokens;
  res.setHeader("x-auth-token", accessToken);
  res.cookie("refresh-token", refreshToken, { httpOnly: true }); // add secure:true on production
  // return status 200
  return res.status(200).json({ error: false, message: "Tokens refreshed!" });
}
