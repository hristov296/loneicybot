const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
        hashes: "",
        user: action.payload,
      };
    case "authError":
      return {
        ...state,
        errors: action.payload,
      };
    case "logoutUser":
      return {
        ...state,
        isAuthenticated: false,
        hashes: "",
        user: "",
      };
    default:
      return state;
  }
};

export default reducer;
