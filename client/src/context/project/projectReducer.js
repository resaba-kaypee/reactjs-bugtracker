import {
  ADD_PROJECT,
  GET_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  PROJECT_ERROR,
  FILTER_PROJECTS,
  CLEAR_FILTERED_PROJECTS,
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
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false
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
        ...state,
        filtered: state.projects.filter(project => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return project.description.match(regex) || project.projectName.match(regex);
        })
      };
    case CLEAR_FILTERED_PROJECTS:
      return {
        ...state,
        filtered: null
      };
    case CLEAR_PROJECTS:
      return {
        ...state
      };
    default:
      return state;
  }
};
