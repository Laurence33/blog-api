import { Request, Response } from "express";
import { uploadFilesMiddleware } from "../middlewares/upload";
import { getImageUrls } from "../services/ImageService";
import {
  createNewPost,
  deletePostById,
  getOwnPosts,
  getPostById,
  updateOwnPost,
} from "../services/PostService";
import {
  create200Response,
  create201Response,
  create204Response,
  create400Response,
  create404Response,
  create500Response,
  HttpResponse,
} from "../utils/ResponseService";

function adaptResponse(res: Response, httpResponse: HttpResponse) {
  res.header("Content-Type", httpResponse.headers.contentType);
  if (httpResponse.data) {
    return res.json({
      message: httpResponse.message,
      code: httpResponse.code,
      data: httpResponse.data,
    });
  }
  return res.json({
    message: httpResponse.message,
    code: httpResponse.code,
  });
}

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await getOwnPosts(req.body.uid);
    return adaptResponse(res, create201Response(posts));
  } catch (error: any) {
    return adaptResponse(res, create500Response("Internal Server Error"));
  }
}

export async function createPost(req: Request, res: Response) {
  const uid = req.body.uid;
  try {
    await uploadFilesMiddleware(req, res);
    if (!req.files || (req.files && req.files.length <= 0)) {
      return adaptResponse(
        res,
        create400Response("You must select at least 1 file.")
      );
    }
    const newPost = await createNewPost({
      ...req.body,
      uid,
      images: req.files,
    });
    return adaptResponse(
      res,
      create200Response("Post has been created", newPost)
    );
  } catch (error: any) {
    return adaptResponse(res, create500Response("Something went wrong."));
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const updatedPost = await updateOwnPost(req.body);
    return adaptResponse(
      res,
      create204Response("Post has been updated.", updatedPost)
    );
  } catch (error: any) {
    return adaptResponse(res, create500Response("Something went wrong."));
  }
}

export async function getPost(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await getPostById(postId);

    if (!post) {
      return adaptResponse(res, create404Response());
    }
    return adaptResponse(res, create200Response("Success", post));
  } catch (error: any) {
    return adaptResponse(res, create500Response("Something went wrong."));
  }
}

export async function deletePost(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await deletePostById(postId);
    if (!post) {
      return adaptResponse(res, create404Response());
    }
    return adaptResponse(res, create200Response("Post has been deleted", post));
  } catch (error: any) {
    return adaptResponse(res, create500Response("Something went wrong."));
  }
}

export async function getPostImageUrls(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await getPostById(postId);
    const urls = await getImageUrls(post?.images as string[]);
    return res.status(200).json({ error: false, urls });
  } catch (error: any) {
    return adaptResponse(res, create500Response("Something went wrong."));
  }
}
