const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFecthing: true, error: false };

    case "LOGIN_SUCCESS":
      return { user: action.payload, isFecthing: false, error: false };

    case "LOGIN_FAILURE":
      return { user: null, isFecthing: false, error: action.payload };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (forllwing) => forllwing !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default authReducer;
