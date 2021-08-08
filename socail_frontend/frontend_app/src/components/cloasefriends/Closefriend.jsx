import React from 'react'
import './Closefriend.css'
function Closefriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
             <li className="sidebarfriend">
              <img   src={user.profilePicture ? PF+user.profilePicture : PF+"person/lg.png"} alt="" className="sidebarfriendimg" />
              <span className="sidebarfriendname">
                   {user.username}
              </span>
          </li>
        </div>
    )
}

export default Closefriend
