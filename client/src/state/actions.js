import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      window.location.href = "./";
    }) // re-direct to login on successful register
    .catch(err => {
      console.log(err);
      dispatch({
        type: "authError",
        payload: err.response.data,
      });
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // window.location.href = "./";
    })
    .catch(err => {
      dispatch({
        type: "authError",
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  setAuthToken(false);
  dispatch({ type: "logoutUser" });
  // window.location.href = "./";
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: "setCurrentUser",
    payload: decoded,
  };
};

export const loginWithTwitch = () => {
  axios
    .post("/tw-login")
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
