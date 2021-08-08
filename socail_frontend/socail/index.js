import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./rotues/users.js";
import authRouter from "./rotues/auth.js";
import postRoute from "./rotues/post.js";
import multer from "multer";
import path from "path";

const app = express();
dotenv.config();
//midelwaers
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//connecting to mongodb
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

app.post("/api/upload", (req, res) => {
  console.log("uploaded");
  res.status(200).json("upload");
});
//setting up routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);
/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/

const port = process.env.PORT || 9099;
app.listen(port, () => console.log(`Listening on ${port}`));
