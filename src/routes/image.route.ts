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

/**
 *
 * @api {GET} /api/images/:filename Download an Image
 * @apiName Blog API
 * @apiGroup Images
 * @apiVersion  0.0.1
 *
 * @apiParam  {String} filename Filename of the image to download
 *
 * @apiSuccess (200) {json} Image has been downloaded successfully
 *
 *
 */
imageRouter.get("/:filename", downloadImage);

export default imageRouter;
