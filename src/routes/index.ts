import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { HttpResponse } from "../utils/ResponseService";
import authRouter from "./auth.route";
import imageRouter from "./image.route";
import postRouter from "./post.route";
import searchRouter from "./search.route";

const router = Router();
router.use("/auth", authRouter); // Route for register, login, logout, refresh
router.use("/posts", postRouter); // Route for Posts CRUD, and getting urls of image
router.use("/images", imageRouter); // Route for downloading Images
router.use("/search", searchRouter); // Route for searching/filtering of posts

export default router;
