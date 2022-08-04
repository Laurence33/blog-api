import { Request, Response } from "express";
import { Post } from "../models/post.model";
import { buildQuery } from "../services/SearchService";
import { internalServerError } from "../utils/500response";

export async function searchPosts(req: Request, res: Response) {
  try {
    const query = buildQuery(req.query);
    const result = await Post.find(query, {
      limit: req.query.limit ?? 10,
      body: true,
      createdAt: true,
      title: true,
      images: true,
      updatedAt: true,
      user: true,
    });
    console.log(query, result);

    return res.status(200).json(result);
  } catch (error: any) {
    internalServerError(res, error.message);
  }
}
