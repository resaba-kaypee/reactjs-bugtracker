import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ISSUES,
  FILTER_ISSUES,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload]
      };
      break;
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.id !== action.payload)
      };
      break;
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
      break;
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
      break;
    default:
      return state;
  }
};
