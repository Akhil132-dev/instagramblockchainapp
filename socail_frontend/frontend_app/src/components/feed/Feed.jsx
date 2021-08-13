import React, { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({username}) {
  const [post, setPost] = useState([]);
  const [text, settext] = useState("");
const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username ?  await axios.get(`/posts/profile/`+username):await axios.get(`/posts/timeline/`+user._id);
        console.log(res)
      setPost(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedwrapper">
     {!username || (username === user.username) && <Share /> }  
        {post.map((p) => (
          <Post key={p._id} Post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
