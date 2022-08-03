import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/PostController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, getPosts);
router.post("/", authenticate, createPost);
router.post("/:id", updatePost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
// router.get("/:id/images", getImages); // TODO: Allow adding of photos to post

export default router;
