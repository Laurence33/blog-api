import { default as mongoose, Schema } from "mongoose";

const loginSchema = new Schema({
  username: { type: "string", required: true, unique: true },
  passwordDigest: { type: "string", required: true },
});

export const Login = mongoose.model("Login", loginSchema);
