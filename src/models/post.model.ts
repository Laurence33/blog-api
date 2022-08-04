import mongoose from "mongoose";
import { Image } from "./image.model";
const SchemaTypes = mongoose.SchemaTypes;

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "Login",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
    images: [
      {
        type: SchemaTypes.ObjectId,
        ref: "photo.files",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
