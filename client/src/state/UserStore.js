import React from "react";
import reducer from "./reducer";
import { registerUser } from "./actions";

const UserContext = React.createContext();

const UserStore = ({ userData, ...props }) => {
  const initialState = {
    isAuthenticated: false,
    user: "",
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleSetUser: () => registerUser(userData)(dispatch),
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserStore };
export default UserContext;
