import { Request, Response } from "express";
import { findLoginByUsername } from "../services/LoginService";
import {
  createNewPost,
  deletePostById,
  getOwnPosts,
  getPostById,
  updateOwnPost,
} from "../services/PostService";
import { internalServerError } from "../utils/500response";

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await getOwnPosts(req.body.uid);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const newPost = await createNewPost(req.body);
    return res.status(200).json({
      error: false,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const updatedPost = await updateOwnPost(req.body);
    return res.status(200).json({
      error: false,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
}

export async function getPost(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: true, message: "Post not found" });
    }
    return res.status(200).json({ error: false, post: post });
  } catch (error: any) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return res.status(404).json({ error: true, message: "Post not found" });
    }

    return internalServerError(res);
  }
}
export async function deletePost(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await deletePostById(postId);
    if (!post) {
      return res
        .status(200)
        .json({
          error: true,
          message: "Failed to delete post, post not found.",
        });
    }
    return res.status(200).json({ error: false, post: post });
  } catch (error: any) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return res
        .status(404)
        .json({
          error: true,
          message: "Failed to delete post, post not found.",
        });
    }

    return internalServerError(res);
  }
}
