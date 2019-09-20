import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

let init = {
  isAuthenticated: false,
  user: "",
};

const currentTime = Date.now() / 1000;

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  if (decoded.exp > currentTime) {
    // Set user and isAuthenticated
    init = {
      isAuthenticated: true,
      user: decoded,
    };
  }
}

ReactDOM.render(<App authCheck={init} />, document.getElementById("root"));
