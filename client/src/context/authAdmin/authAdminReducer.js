import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_SUCCESS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload
      }
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null
      }
    default:
      return state;
  }
};
