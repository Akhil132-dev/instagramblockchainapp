import React, { createContext, useReducer } from "react";
import authReducer from "./Reducer";
const INITIAL_STATE = {
  // we are not loged in so user it null
  user: {
    _id: "60fffc6fa7894a1338dd56d4",
    coverPicture: "",
    profilePicture: "",
    followers: [],
    following: [],
    isAdmin: false,
    username: "akhilesh",
    email: "akhil@14gmail.com",
    passward: "$2b$10$SweAA4fX3J7L8J23toxyJ.EEf5XLTd3JCrLb3EL29/UVzBVjrbFO.",
    createdAt: { $date: { $numberLong: "1627389039729" } },
    updatedAt: { $date: { $numberLong: "1628662218008" } },
    __v: { $numberInt: "0" },
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
