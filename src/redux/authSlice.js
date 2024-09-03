const AuthEnum = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
};

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthEnum.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refresh_token,
        error: null,
      };
    case AuthEnum.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case AuthEnum.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        error: null,
      };
    case AuthEnum.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refresh_token,
      };
    default:
      return state;
  }
};

export const loginSuccess = (data) => ({
  type: AuthEnum.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: AuthEnum.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  return { type: AuthEnum.LOGOUT };
};

export const refreshTokenSuccess = (data) => ({
  type: AuthEnum.REFRESH_TOKEN_SUCCESS,
  payload: data,
});
