import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

let init = {
  isAuthenticated: false,
  user: "",
};
let hashesIn = "";

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

const hash = window.location.hash.substr(1);
const hashes = hash.split("&").reduce(function(result, item) {
  var parts = item.split("=");
  result[parts[0]] = parts[1];
  return result;
}, {});

if (hashes.hasOwnProperty("id_token") && hashes.hasOwnProperty("access_token")) {
  // handleLogin({ init, hashes });
  hashesIn = hashes;
  window.history.pushState("", document.title, window.location.pathname);
}

ReactDOM.render(<App authCheck={init} hashesIn={hashesIn} />, document.getElementById("root"));
