import React, { useReducer } from "react";
import reducer from "./reducer";
import { registerUser, loginUser, logoutUser, handleLogin } from "./actions";

const UserContext = React.createContext();

const UserStore = ({ userData, ...props }) => {
  const { hashesIn, authCheck } = props;

  const initialState = {
    errors: {},
    hashes: hashesIn,
    loadingLoginCreds: false,
    ...authCheck,
  };

  console.log(initialState);
  // use reducer functions
  const [state, dispatch] = useReducer(reducer, initialState);

  // save current isAuthenticated state
  // const savedAuth = React.useRef(state.isAuthenticated);

  console.log(state);
  if (state.hashes && !state.errors.twlogin && (!state.isAuthenticated || !state.user.twid)) {
    state.loadingLoginCreds = true;
    handleLogin({ init: authCheck, hashes: state.hashes })(dispatch);
  }

  if (state.loadingLoginCreds && (state.isAuthenticated || state.errors.twlogin)) {
    state.loadingLoginCreds = false;
  }
  // on change is 'isAuthenticated' redirect to home
  // if (state.isAuthenticated !== savedAuth.current) {
  //   console.log("detected change in isAuth" + savedAuth.current + state.isAuthenticated);
  //   window.location.href = "./";
  //   return;
  // }

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleRegisterUser: userData => registerUser(userData)(dispatch),
        handleLoginUser: userData => loginUser(userData)(dispatch),
        handleLogoutUser: () => logoutUser()(dispatch),
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserStore };
export default UserContext;
