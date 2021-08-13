import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { Profiler } from "react";
import Home from "./pages/hom/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import { AuthContext } from "./context/AuthContext";
import { Message } from "@material-ui/icons";
import Messenge from "./messenge/massenge.jsx";
function App() {
  
 const {user, isFecthing,error, dispatch} = useContext(AuthContext)

  console.log(user)
  return (

    

    <Router>
      <Switch>

            <Route exact path="/">
          {
         user ?  <Home /> : <Register/>
          }
         
        </Route>
      
        <Route path="/login">
          {
            user? <Redirect to='/'/> :  <Login />
          }
         
        </Route>
        <Route path="/chat">
          {
             user?  <Messenge/> :<Redirect to='/'/> 
          }
         
        </Route>
        <Route path="/register">
          {
            user? <Redirect to='/'/> :  <Register /> 
          }
         
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>{" "}
    
      </Switch>
    </Router>

  
  );
}

export default App;
