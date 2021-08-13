import React from "react";
import "./msg.css";
import {format} from'timeago.js'
function Msg({ messages,own  }) {
  return (
    <div className={own ? "msg own " : "msg"}>
      <div className="msgtop">
        <img
          src={messages.profilePicture}
          alt=""
          className="msg_img"
        />

        <p className="msgtext">{messages.text}</p>
      </div>
      <div className="msgbottom">{format(messages.createdAt)}</div>
    </div>
  );
}

export default Msg;
