import mongoose from "mongoose";
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
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
