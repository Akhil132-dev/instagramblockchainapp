import Post from "../model/post.js";
import User from "../model/User.js";
//create a post

const post = async (req, res) => {
  //get the body of the post
  const newPost = await new Post(req.body);
  try {
    //saving the post on to the database
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
//update a post
const update = async (req, res) => {
  try {
    //getting the post id form the url
    const post = await Post.findById(req.params.id);
    /** if @param post.userId is equal to the the current user   then we can update otherwise we can't update the post */
    if (post.userId === req.body.userId) {
      //upadating the post
      await post.updateOne({ $set: req.body });
      res.status(200).json("post hase been updated");
    } else {
      res.status(403).json("you can update only your post's");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete a post
const Delete = async (req, res) => {
  try {
    //getting the  post id from the url
    const post = await Post.findById(req.params.id);
    /**
     * if @param post.userId is equal to the current user id then we can delete the post else we can't
     *
     */
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post hase been deleted");
    } else {
      res.status(403).json("you can delete only your post's");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//like a post
const Like = async (req, res) => {
  //getting the post id
  const post = await Post.findById(req.params.id);
  try {
    /** if @param post.likes array does not include the user then we include it inside of the array otherwise we will pull the id from the array */
    if (!post.likes.includes(req.body.userId)) {
      //pushing the id into the array or likeing the photo
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked !");
    } else {
      //pulling out the id from the array or dislikeing the post
      await post.update({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked !");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//get a post
const getPost = async (req, res) => {
  try {
    //getting the current url id
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get timeline  posts
const timeline = async (req, res) => {
  try {
    //getting the current user id
    const currentUser = await User.findById(req.params.userId);
    // getting the user all post
    const userPosts = await Post.find({ userId: currentUser._id });
    //now getting all his followers post from following array
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    //returning the response with users own post and his friend post as well
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};
const getuserPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: user._id });
    //returning the response with users own post and his friend post as well
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//exporting all the functions
export { post, update, Delete, Like, getPost, timeline, getuserPost };
