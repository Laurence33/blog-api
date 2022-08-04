import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import authRouter from "./auth.route";
import imageRouter from "./image.route";
import postRouter from "./post.route";
import searchRouter from "./search.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/images", imageRouter);
router.use("/search", searchRouter);

export default router;
