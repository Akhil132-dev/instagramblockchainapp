import React, { useEffect, useState } from "react";
import "./profile.css";
import PersonIcon from "@material-ui/icons/Person";
import Topbar from "../components/topbar/Topbar";
import Left from "../components/sidebar/Left";
import Feed from "../components/feed/Feed";
import Right from "../components/rightbar/Right";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router";

function Profile() {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [user, setUser] = useState({})
     useEffect(() => {
    const fetchUser= async () => {
      try {
        //getting the user from the data base using username
        const res = await axios.get(`/users?username=${username}`);
        console.log(res)
       setUser((res.data))  
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username]);
  // it will give u the url username from the url 
  const username  = useParams().username;
  

  return (
<div> 
<Topbar/>
<div className="Profile__conatiner">
      <Left />
      <div className="Profile__right">
          <div className="profile__right_top">
            
            <div className="profile__cover">

              <img src={user.coverPicture || PF+"post/8.jpeg"}alt="" className="profile__cover__img" />
              <img src={user.profilePicture || PF+"post/1.jpeg"} alt="" className="profile__user__img" />
         
            </div>
            <div className="profile__info">
                <h4 className="profile__info__name" >{user.username}</h4>
                <span className="profile__desc">
                    {user.desc}
                </span>
            </div>
          </div>
          <div className="profile__right_bottom">
              <Feed username={username}/>
        <Right  user ={user}/>  
          </div>
      
      </div>
    </div></div>

   
  );
}

export default Profile;
