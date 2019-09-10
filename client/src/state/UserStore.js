import React, { useReducer, useState, useEffect } from "react";
import reducer from "./reducer";
import { registerUser, loginUser, logoutUser, setCurrentUser } from "./actions";

// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

// const UserContext = init => React.createContext(init);

const UserStore = ({ userData, toHome = false, ...props }) => {
  const initialState = {
    isAuthenticated: null,
    user: "",
    errors: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loadToken, checkForToken] = useState(false);
  // const [toHome, setToHome] = useState(false);
  console.log(state);
  // useEffect(() => {
  //   if (localStorage.jwtToken) {
  //     // Set auth token header auth
  //     const token = localStorage.jwtToken;
  //     setAuthToken(token);
  //     // Decode token and get user info and exp
  //     const decoded = jwt_decode(token);

  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp > currentTime) {
  //       // Set user and isAuthenticated
  //       dispatch(setCurrentUser(decoded));
  //     }
  //   }
  //   checkForToken(true);
  // }, []);

  useEffect(() => {
    if (state.isAuthenticated === true || state.isAuthenticated === false) {
      props.history.replace("/");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleRegisterUser: userData => registerUser(userData)(dispatch),
        handleLoginUser: userData => loginUser(userData)(dispatch),
        handleLogoutUser: () => logoutUser()(dispatch),
        // toHome: () => props.toHome,
      }}>
      {loadToken ? props.children : ""}
    </UserContext.Provider>
  );
};

export { UserStore };
export default UserContext;
