import { Router } from "express";
import { validateLoginDetails } from "../middlewares/validators/validate-login-details";
import {
  createLogin,
  login,
  logout,
  refreshToken,
} from "../controllers/AuthController";
import { downloadImage } from "../controllers/ImageController";

const imageRouter = Router();

imageRouter.get("/:filename", downloadImage);

export default imageRouter;
