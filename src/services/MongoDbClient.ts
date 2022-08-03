import { default as mongoose } from "mongoose";

export const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};
