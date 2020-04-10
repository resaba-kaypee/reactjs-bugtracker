import {
  GET_ALL_USERS,
  REGISTER_USER,
  FILTER_USERS,
  DELETE_USER,
  USERS_ERROR,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_FILTER
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
        users: [action.payload.newUser, ...state.users],
        success: action.payload.msg,
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
        success: null,
        error: null
      };
    default:
      return state;
  }
};
