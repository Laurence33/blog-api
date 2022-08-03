import { Post } from "../models/post.model";

export function getOwnPosts(uid: string) {
  return Post.find({ user: uid });
}
export function createNewPost(body: any) {
  return Post.create({
    title: body.title,
    body: body.body,
    user: body.uid,
  });
}
export function updateOwnPost(body: any) {
  return Post.findByIdAndUpdate(
    body.id,
    {
      title: body.title,
      body: body.body,
    },
    { new: true }
  );
}

export function getPostById(id: string) {
  return Post.findById(id);
}

export function deletePostById(id: string) {
  return Post.findByIdAndDelete(id);
}
