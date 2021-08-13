import { MoreVert } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import dotenv  from  'dotenv'
import {format} from 'timeago.js'
import axios from "axios";
import { Avatar } from "@material-ui/core";
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
function Post({ Post }) {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setlike] = useState(Post.likes.length);
  const [isLike, setisLike] = useState(false);
  const {user}= useContext(AuthContext)

 const [User, setUser] = useState({})
 useEffect(() => {
  setisLike(Post.likes.includes(user._id))
 }, [user._id,Post.likes])
  const likeHandeler = () => {
    console.log("cl")
    try {
      axios.put(`/posts/${Post._id}/like`,{userId:user._id})
    } catch (error) {
      console.log(error)
    }
  };
console.log(Post)
  useEffect(() => {
    const fetchUser= async () => {
      try {
        //getting the user from the data base using post id 
        const res = await axios.get(`/users?userId=${Post.userId}`);
        // console.log(res.data)
       setUser(res.data)  
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [Post.userId]);

  return (
    <div className="post">
      <div className="post__wrapper">
        <div className="post__wrapper_top">
      
          <div className="post_top_left">    <Link to={`profile/${User.username}`}>
           <img
              src={User?.profilePicture?User?.profilePicture : '/assets/person/lg.jpg'}
              className="postProfileimage"
              alt=""
            />
          </Link>
           
            <span className="postusername">
              {User?.username}
            </span>
            <span className="postdate">{format(Post.createdAt)}</span>
          </div>
          <div className="post_top_right">
            <MoreVert />
          </div>
        </div>
        <div className="post__wrapper_center">
          <span className="postText">{Post.desc}</span>
          <img className="post__image" src={Post.img} alt="" />
        </div>
        <div className="post__wrapper_bottum">
          <div className="post__bottum_left">
            <img
              className="like_icon"
              src={`${PF}/heart.png`}
              onClick={likeHandeler}
              alt=""
            />
            <img
              className="like_icon"
              src={`${PF}/like.png`}
              onClick={likeHandeler}
              alt=""
            />
            <span className="lickcounter">{Post.likes.length} people liked this</span>
          </div>
          <div className="post__bottum_right">
            <span className="postcommenttext">{Post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
