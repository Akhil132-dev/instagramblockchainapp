import React, { useContext, useEffect, useState } from "react";
import "./Right.css";
import { Users } from "../../dumydata";
import Online from "../online/Online";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
function Right({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentuser ,dispatch} = useContext(AuthContext);
  const [friends, setfriends] = useState([]);
  const [follow, setfollow] = useState(currentuser.following.includes(user?.id));
  useEffect(() => {
    setfollow(currentuser.following.includes(user?.id));
  }, [currentuser, user?.id]);
  useEffect(() => {
    const getFirnds = async () => {
      try {
        const friendlist = await axios.get("/users/friends/" + user?._id);
        setfriends(friendlist.data);
      } catch (error) {}
    };
    getFirnds();
  }, [user?._id]);

  const handleFollower = async () => {
    try {
      if (follow){
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentuser._id,
        });
        dispatch({type:"UNFOLLOW",payload:user._id})
      }
        
      else{
         await axios.put("/users/" + user._id + "/follow", {
          userId: currentuser._id,
        });
         dispatch({type:"FOLLOW",payload:user._id})
      }
       
    } catch (error) {}
    setfollow(!follow);
  };
  const Homepage = () => {
    return (
      <div>
        <div className="brithdayContainer">
          <img src={`${PF}+gift.png`} alt="" className="brithday_img" />
          <span className="brithday_text">
            {" "}
            <b>AKhile</b> and <b>3 other friends</b> have brithday today
          </span>
        </div>
        <img src={`${PF}/assets/ad.png`} alt="" className="rightbar__add" />
        <h4 className="rightbar_title">Online Friends</h4>
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </div>
    );
  };
  const ProfileRightbar = () => {
    return (
      <div>
        {" "}
        {user?.username !== currentuser.username && (
          <button className="rightfollowbutton" onClick={handleFollower}>
            {follow ? "Unfollow" : "follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarinfoItem">
            <span className="rightbarInfokey">City</span>
            <span className="rightbarInfovalue">{user.city}</span>
          </div>
          <div className="rightbarinfoItem">
            <span className="rightbarInfokey">From</span>
            <span className="rightbarInfovalue">{user.from}</span>
          </div>
          <div className="rightbarinfoItem">
            <span className="rightbarInfokey">Relationship</span>
            <span className="rightbarInfovalue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User firends</h4>
        <div className="rightbarFollowings">
          {friends.map((firend) => (
            <div className="rightbarfollowings">
              <Link
                to={"/profile/" + firend.username}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={
                    firend.profilePicture
                      ? firend.profilePicture
                      : "/assets/person/lg.jpg"
                  }
                  alt=""
                  className="rightbarfollowingimg"
                />
                <span className="rightbarfollowingName">{firend.username}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="right">
      <div className="rightbarWrrapper">
        {user ? <ProfileRightbar /> : <Homepage />}
      </div>
    </div>
  );
}

export default Right;
