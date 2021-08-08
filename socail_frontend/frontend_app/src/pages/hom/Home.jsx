import React from "react";
import './Home.css'
import PersonIcon from "@material-ui/icons/Person";
import Topbar from "../../components/topbar/Topbar";
import Left from "../../components/sidebar/Left";
import Feed from "../../components/feed/Feed";
import Right from "../../components/rightbar/Right";
function Home() {
  return (
    <div>
      <Topbar />
      <div className="home__conatiner">
         <Left /> 
         <Feed/>
         <Right/>
      </div>
    
    </div>
  );
}

export default Home;
