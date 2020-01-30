import {
  ADD_PROJECTS,
  GET_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  PROJECT_ERROR,
  FILTER_PROJECTS,
  CLEAR_FILTER_PROJECTS,
  CLEAR_PROJECTS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case ADD_PROJECTS:
      return {
        ...state
      };
    case UPDATE_PROJECT:
      return {
        ...state
      };
    case DELETE_PROJECT:
      return {
        ...state
      };
    case PROJECT_ERROR:
      return {
        ...state
      };
    case FILTER_PROJECTS:
      return {
        ...state
      };
    case CLEAR_PROJECTS:
      return {
        ...state
      };
    case CLEAR_FILTER_PROJECTS:
      return {
        ...state
      };
    default:
      return state;
  }
};
