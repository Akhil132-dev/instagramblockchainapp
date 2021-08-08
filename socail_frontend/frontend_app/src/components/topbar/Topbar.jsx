import React, { useContext } from "react";
import { Search, Person ,Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css";
import {Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
function Topbar() {
  const {user, isFecthing,error, dispatch} = useContext(AuthContext)
  const PF  = process.env.REACT_APP_PUBLIC_FOLDER 
  return (
    <div className="topbar">
      {/* topbar left  */}
      <div className="topbar__left">
        {/* topbar__logo */}
        <Link to="/">
             <span className="topbar__logo">facebook</span> 
        </Link>
  
      </div>
      {/* topbar center  */}
      <div className="topbar__center">
        {/* serach bar  */}
        <div className="topbar__center_search">
          <Search  className="search__icon"/>
          <input
            placeholder="Search for friend , post  or videos "
            className="search_input"
          />
        </div>
      </div>
      {/* topbar right  */}
      <div className="topbar__right">
        {/* topbar links  */}
        <div className="topbar__right_links">
          <span className="topbar_r_links">Homepage</span>
          <span className="topbar_r_links">Time line</span>
        </div>
        {/* topbar_r_Icons */}
        <div className="topbar_r_Icons">
          <div className="topobar_r_IconItem">
            <Person />
            <span className="topbar_r_IconBadge">1</span>
          </div>
          <div className="topobar_r_IconItem">
            <Chat />
            <span className="topbar_r_IconBadge">1</span>
          </div>
          <div className="topobar_r_IconItem">
            <Notifications/>
            <span className="topbar_r_IconBadge">1</span>
          </div>
        </div>
        <Link to={`profile/${user.username}`}>
        <img src={user.profilePicture ?  PF+user.profilePicture : 'assets/person/lg.jpg'} alt="" className="topbar__Image" />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
