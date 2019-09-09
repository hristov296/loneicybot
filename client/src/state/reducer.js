const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
