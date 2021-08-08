import "./Register.css";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const again_password = useRef();
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== again_password.current.value) {
      password.current.setCustomValidity("Password dont matchs");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        passward: password.current.value,
      };

      try {
        await axios.post("auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Facebook.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                type="text"
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                type="email"
                className="loginInput"
              />
              <input
                placeholder="Password"
                required
                minLength="6"
                ref={password}
                type="password"
                className="loginInput"
              />
              <input
                placeholder="Password Again"
                required
                minLength="6"
                ref={again_password}
                type="password"
                className="loginInput"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <Link to="/login">
                <button className="loginRegisterButton">
                  Log into Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
