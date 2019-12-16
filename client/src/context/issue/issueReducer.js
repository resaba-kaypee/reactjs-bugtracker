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
    default:
      return state;
  }
};
