import { Post } from "../models/post.model";
import { Image } from "../models/image.model";

export function getOwnPosts(uid: string) {
  return Post.find({ user: uid });
}
export function createNewPost(body: any) {
  const imagesIdArray = body.images.map((img: any) => img.id);
  return Post.create({
    title: body.title,
    body: body.body,
    user: body.uid,
    images: imagesIdArray,
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
  return Post.findById(id).populate({
    path: "photo.files",
    model: "photo.files",
    strictPopulate: false,
  });
}

export function deletePostById(id: string) {
  return Post.findByIdAndDelete(id);
}
