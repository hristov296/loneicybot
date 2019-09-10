const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
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
      };
    default:
      return state;
  }
};

export default reducer;
