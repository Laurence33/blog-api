import { Request, Response } from "express";
import { uploadFilesMiddleware } from "../middlewares/upload";
import { getImageById, getImageUrls } from "../services/ImageService";
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
  } catch (error: any) {
    console.log(error);
    return internalServerError(res, error.message);
  }
}

export async function createPost(req: Request, res: Response) {
  const uid = req.body.uid;
  try {
    await uploadFilesMiddleware(req, res);
    console.log(req.files);
    if (req.files && req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    const newPost = await createNewPost({
      ...req.body,
      uid,
      images: req.files,
    });
    return res.status(200).json({
      error: false,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error: any) {
    console.log(error);
    return internalServerError(res, error.message);
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
  } catch (error: any) {
    console.log(error);
    return internalServerError(res, error.message);
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
    return internalServerError(res, error.message);
  }
}

export async function deletePost(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await deletePostById(postId);
    if (!post) {
      return res.status(200).json({
        error: true,
        message: "Failed to delete post, post not found.",
      });
    }
    return res.status(200).json({ error: false, post: post });
  } catch (error: any) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return res.status(404).json({
        error: true,
        message: "Failed to delete post, post not found.",
      });
    }

    return internalServerError(res, error.message);
  }
}

export async function getPostImageUrls(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await getPostById(postId);
    const urls = await getImageUrls(post?.images as string[]);
    return res.status(200).json({ error: false, urls });
  } catch (error: any) {
    internalServerError(res, error.message);
  }
}
