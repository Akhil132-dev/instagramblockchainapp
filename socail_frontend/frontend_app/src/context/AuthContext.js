import React, { createContext, useReducer } from "react";
import authReducer from "./Reducer";
const INITIAL_STATE = {
  // we are not loged in so user it null
  user: {
    _id: "60fffc77a7894a1338dd56d6",
    coverPicture: "",
    profilePicture: "",
    followers: [],
    following: ["60fffc6fa7894a1338dd56d4"],
    isAdmin: false,
    username: "akhilesh4",
    email: "akhil@145gmail.com",
    passward: "$2b$10$6AbveAKXIW.SZPUPVD8ywukYohQTlvDFDAzlPBcTMhKApYl9c/xZu",
    createdAt: { $date: { $numberLong: "1627389047118" } },
    updatedAt: { $date: { $numberLong: "1627639236170" } },
    __v: { $numberInt: "0" },
    city: "Bhopal",
    from: "Indai",
    relationship: { $numberInt: "1" },
    desc: "a Computer Science enginner",
  },
  // we are not fecthing anything in the start to @param isFecthing is false by default
  isFecthing: false,
  //at the begining we dont have any error
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);
/**
 *
 * all the data that is inside of the  @param AuthContextProvider can be used in any where in side of the appliction
 * if you rap app.js from the index.js  @param childern is the app component of form the index.js
 * state.user is comeing from the useRequcer state where all the thing are capt
 * Authcontext create a context that we can use where we want to use
 *
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
