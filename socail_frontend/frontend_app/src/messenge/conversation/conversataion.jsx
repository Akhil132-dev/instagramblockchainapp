import axios from "axios";
import React, { useEffect, useState } from "react";
import "./con.css";
function Conversataion({ conver, currentuser }) {
  const [user, setuser] = useState(null);
  useEffect(() => {
    const friendId = conver.members.find((m) => m !== currentuser);
    const getuser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setuser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [currentuser, conver]);

  return (
    <div className="conversatation">
      <img
        src={user?.profilePicture ? user?.profilePicture : '/lg.jpg'}
        alt=""
        className="conversation_img"
      />
      <span className="conversataion__name">{user?.username}</span>
    </div>
  );
}

export default Conversataion;
