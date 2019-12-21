import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ISSUE,
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
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map(issue =>
          issue.id === action.payload.id ? action.payload : issue
        )
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.id !== action.payload)
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
    default:
      return state;
  }
};
