import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  const currentTime = Date.now() / 1000;
  if (decoded.exp > currentTime) {
    // Set user and isAuthenticated
    dispatch(setCurrentUser(decoded));
  }
}

const UserContext = init => React.createContext(init);

ReactDOM.render(<App userCtx={UserContext} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
