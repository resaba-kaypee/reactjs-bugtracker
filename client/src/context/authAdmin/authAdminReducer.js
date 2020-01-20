import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  UPDATE_ISSUE,
  ISSUE_ERROR,
  CLEAR_ISSUES,
  FILTER_ISSUES,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_ISSUES,
  ADD_ISSUE,
  DELETE_ISSUE
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
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
      };
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
    case GET_ISSUES:
      return {
        ...state,
        issues: action.payload,
        loading: false
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: [action.payload, ...state.issues],
        loading: false
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map(issue =>
          issue._id === action.payload._id ? action.payload : issue
        ),
        loading: false
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue._id !== action.payload),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case ISSUE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ISSUES:
      return {
        ...state,
        issues: null,
        filtered: null,
        error: null,
        current: null
      };
    case FILTER_ISSUES:
      return {
        ...state,
        filtered: state.issues.filter(issue => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return issue.description.match(regex) || issue.date.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null
      };
    default:
      return state;
  }
};
