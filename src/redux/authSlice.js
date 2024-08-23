const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESS",
  payload: data,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const logout = () => {
  localStorage.removeItem("token");
  return { type: "LOGOUT" };
};
