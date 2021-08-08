import React from "react";
import "./Right.css";
import { Users } from "../../dumydata";
import Online from "../online/Online";
function Right({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const Homepage = () => {
    return (
      <div>
        <div className="brithdayContainer">
          <img src={`${PF}/assets/gift.png`} alt="" className="brithday_img" />
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
          <div className="rightbarfollowings">
            <img
              src={`${PF}/person/1.jpeg`}
              alt=""
              className="rightbarfollowingimg"
            />
            <span className="rightbarfollowingName">Ram</span>
          </div>
          <div className="rightbarfollowings">
            <img
              src={`${PF}/person/2.jpeg`}
              alt=""
              className="rightbarfollowingimg"
            />
            <span className="rightbarfollowingName">Ram Rmap</span>
          </div>
          <div className="rightbarfollowings">
            <img
              src={`${PF}/person/3.jpeg`}
              alt=""
              className="rightbarfollowingimg"
            />
            <span className="rightbarfollowingName">Ram</span>
          </div>
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
