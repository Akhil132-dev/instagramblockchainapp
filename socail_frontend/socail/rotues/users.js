import express from "express";
import {
  DeleteUser,
  followUser,
  getUser,
  unFollow,
  updateUser,
} from "../controller/crud.js";
const router = express.Router();
//update users
router.put("/:id", updateUser);
//delete users
router.delete("/:id", DeleteUser);

//get a user
router.get("/", getUser);
//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unFollow);
export default router;
