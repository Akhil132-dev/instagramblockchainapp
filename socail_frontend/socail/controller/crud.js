import User from "../model/User.js";
import bcrypt from "bcrypt";

//update users
const updateUser = async (req, res) => {
  // checking if the id is wrong
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.passward) {
      //changing the passward of the user
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.passward = await bcrypt.hash(req.body.passward, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      //update the user info
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been update");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    //if the use id is not right the it will show this error
    return res.status(403).json("You can only update your account !");
  }
};

//Deleting user from the database
const DeleteUser = async (req, res) => {
  // checking if the id is wrong  coz the only user which is the owner of the account can delete the account
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      //Deleting the data of the user info
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    //if the use id is not right the it will show this error
    return res.status(403).json("You can delete only on  your account !");
  }
};

//getting the info of the user
const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    //get the user from the parametter

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    // remove the passward and updateAt from the user data
    const { passward, updatedAt, ...other } = user._doc;
    //reutrning others rether then returnig user info
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

//following user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //get the user from the parametter
      const user = await User.findById(req.params.id);
      //get the current user
      const currentUser = await User.findById(req.body.userId);

      // if the current user is not follow the params user then we follow
      //other wise say you  already following this  user
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });

        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already following  this user  ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can not follow your-self");
  }
};

// unfollowing user
const unFollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //get the user from the parametter
      const user = await User.findById(req.params.id);
      //get the current user
      const currentUser = await User.findById(req.body.userId);

      // if the current user is not follow the params user then we follow
      //other wise say you  already following this  user
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you are not following   this user  ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can not unfollow your-self");
  }
};
export { updateUser, DeleteUser, getUser, followUser, unFollow };
