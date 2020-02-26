import {
  GET_ALL_USERS,
  REGISTER_USER,
  FILTER_USERS,
  DELETE_USER,
  USERS_ERROR,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_FILTER
  // LOGOUT
  // ADMIN_LOADED,
  // AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // CLEAR_SUCCESS,
  // UPDATE_ISSUE,
  // ISSUE_ERROR,
  // GET_ISSUES,
  // FILTER_ISSUES,
  // CLEAR_ISSUES,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // ADD_ISSUE,
  // ADD_COMMENT,
  // DELETE_ISSUE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case REGISTER_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: state.users.filter(user => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return user.firstName.match(regex) || user.lastName.match(regex);
        })
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case USERS_ERROR:
      return {
        ...state,
        error: action.payload
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
    // case LOGOUT:
    //   localStorage.removeItem("token");
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //     admin: null,
    //     error: action.payload
    //   };
    // case LOGIN_SUCCESS:
    //   localStorage.setItem("token", action.payload.token);
    //   return {
    //     ...state,
    //     ...action.payload,
    //     isAuthenticated: true,
    //     loading: false
    //   };
    // case LOGIN_FAIL:
    // case AUTH_ERROR:
    // case GET_ISSUES:
    //   return {
    //     ...state,
    //     issues: action.payload,
    //     loading: false
    //   };
    // case ADD_ISSUE:
    //   return {
    //     ...state,
    //     issues: [action.payload, ...state.issues],
    //     loading: false
    //   };
    // case UPDATE_ISSUE:
    //   return {
    //     ...state,
    //     issues: state.issues.map(issue =>
    //       issue._id === action.payload._id ? action.payload : issue
    //     ),
    //     loading: false
    //   };
    // case ADD_COMMENT:
    //   return {
    //     ...state,
    //     issues: state.issues.map(issue =>
    //       issue._id === action.payload._id ? action.payload : issue
    //     ),
    //     loading: false
    //   };
    // case DELETE_ISSUE:
    //   return {
    //     ...state,
    //     issues: state.issues.filter(issue => issue._id !== action.payload),
    //     loading: false
    //   };
    // case SET_CURRENT:
    //   return {
    //     ...state,
    //     current: action.payload
    //   };
    // case CLEAR_CURRENT:
    //   return {
    //     ...state,
    //     current: null
    //   };
    // case ISSUE_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload
    //   };
    // case CLEAR_ISSUES:
    //   return {
    //     ...state,
    //     issues: null,
    //     filtered: null,
    //     error: null,
    //     current: null
    //   };
    // case FILTER_ISSUES:
    //   return {
    //     ...state,
    //     filtered: state.issues.filter(issue => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return (
    //         issue.description.match(regex) ||
    //         issue.date.match(regex) ||
    //         issue.projectName.match(regex)
    //       );
    //     })
    //   };
    // case CLEAR_SUCCESS:
    //   return {
    //     ...state,
    //     success: null
    //   };
    default:
      return state;
  }
};
