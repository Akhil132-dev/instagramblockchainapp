import express from "express";
import {
  Delete,
  getPost,
  getuserPost,
  Like,
  post,
  timeline,
  update,
} from "../controller/post.js";
const router = express.Router();

router.post("/", post);

//update a post
router.put("/:id", update);

//delete a post
router.delete("/:id", Delete);
//like a post
router.put("/:id/like", Like);
//get a post
router.get("/:id", getPost);
//get timeline  posts
router.get("/timeline/:userId", timeline);

router.get("/profile/:username", getuserPost);
export default router;
