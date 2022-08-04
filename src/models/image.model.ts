import mongoose from "mongoose";
const SchemaTypes = mongoose.SchemaTypes;

const imageSchema = new mongoose.Schema(
  {
    post: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    chunkSize: {
      type: Number,
      required: true,
    },
    uploadDate: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("photo.files", imageSchema);
