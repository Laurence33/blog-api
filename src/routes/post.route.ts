import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPostImageUrls,
  getPosts,
  updatePost,
} from "../controllers/PostController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, getPosts); // Get all posts
router.post("/", authenticate, createPost); // Create a post
router.post("/:id", authenticate, updatePost); // Update a post
router.get("/:id", getPost); // Read a post
router.delete("/:id", authenticate, deletePost); // Delete a post
router.get("/:id/images", getPostImageUrls); // Get image urls of post

export default router;
