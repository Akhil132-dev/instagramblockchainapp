import React from 'react'
import './online.css'
function Online({user}) {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    
             <ul className="rightfriendlist">
          <li className="rightBarfriend">
            <div className="righbarimgContianert">
              <img
                src={PF+user.profilePicture}
                alt=""
                className="rightbarprofileimg"
              />
              <span className="rightbaronline">

              </span>
            </div>
            <span className="rightbarusername">
              {user.username}
            </span>
          </li>
          
        </ul>
     
    )
}

export default Online
