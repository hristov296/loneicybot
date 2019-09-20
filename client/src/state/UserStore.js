import React, { useReducer } from "react";
import reducer from "./reducer";
import { registerUser, loginUser, logoutUser } from "./actions";

const UserContext = React.createContext();

const UserStore = ({ userData, ...props }) => {
  const initialState = {
    errors: {},
    ...props.authCheck,
  };

  // use reducer functions
  const [state, dispatch] = useReducer(reducer, initialState);

  // save current isAuthenticated state
  const savedAuth = React.useRef(state.isAuthenticated);

  // on change is 'isAuthenticated' redirect to home
  if (state.isAuthenticated !== savedAuth.current) {
    console.log("detected change in isAuth" + savedAuth.current + state.isAuthenticated);
    window.location.href = "./";
    return;
  }

  console.log(state);

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
