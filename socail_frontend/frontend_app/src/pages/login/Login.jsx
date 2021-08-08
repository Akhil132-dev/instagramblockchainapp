import { CircularProgress } from "@material-ui/core";
import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../apicalls";
import "./Login.css";
function Login() {  


  const email = useRef();
  const password = useRef();
  const {user, isFecthing,error, dispatch} = useContext(AuthContext)
  const handleClick = (e) => {
    e.preventDefault();
 
    loginCall({email:email.current.value ,passward:password.current.value},dispatch)
  };
   console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email"ref={email} required type="email" className="loginInput" />
            <input
            ref={password}
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              
            />
            <button className="loginButton"disabled={isFecthing}> { isFecthing?     <CircularProgress  color="white" size="20px"/>:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" >
              { isFecthing?     <CircularProgress  color="white" size="20px"/>:"Create a new Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
