import cookieParser from "cookie-parser";
import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./src/routes/index";
import fs from "fs";
import { connectMongoDB } from "./src/services/MongoDbClient";

// Load env variables
dotenv.config();

// Load Keys
process.env.PRIVATE_KEY = fs.readFileSync("./jwtRS256.key").toString();
process.env.PUBLIC_KEY = fs.readFileSync("./jwtRS256.key.pub").toString();

// Connect to mongoDB
connectMongoDB();

// Instantiate express app
const app: Express = express();
const port = process.env.EXPRESS_PORT || 8080;

// Parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse the cookies
app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log("Express server running on port", port);
});
