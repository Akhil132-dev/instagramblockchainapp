import express from "express";
import User from "../model/User.js";
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
//get frineds

router.get("/friends/:userid", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    console.log(user);
    const friends = await Promise.all(
      user.following.map((followId) => {
        return User.findById(followId);
      })
    );
    let followlist = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      followlist.push({ _id, username, profilePicture });
    });
    res.status(200).json(followlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unFollow);
export default router;
