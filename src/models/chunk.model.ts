import mongoose from "mongoose";
const SchemaTypes = mongoose.SchemaTypes;

const chunkSchema = new mongoose.Schema(
  {
    image: {
      type: SchemaTypes.ObjectId,
      ref: "photo.files",
      required: true,
    },
    n: {
      type: Number,
      required: true,
    },
    data: {
      type: SchemaTypes.Buffer,
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

export const Chunk = mongoose.model("photo.chunk", chunkSchema);
