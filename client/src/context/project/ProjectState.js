import React, { useReducer } from "react";
import axios from "axios";
import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
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

const ProjectState = props => {
  const initialState = {
    projects: null,
    errors: null,
    filtered: null,
    loading: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Add project
  const addProject = () => {};

  // Get all project
  const getProjects = async () => {
    try {
      const res = await axios.get("/api/admin/projects");
      dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg });
    }
  };

  // Update project
  const updateProject = () => {};

  // Delete project
  const deleteProject = () => {};

  // Filter projects
  const filterProjects = () => {};

  // Clear filtered issues
  const clearFilteredProjects = () => {};

  // Clear projects when logging out
  const clearProjects = () => {};

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        filtered: state.filtered,
        errors: state.errors,
        loading: state.loading,
        addProject,
        getProjects,
        updateProject,
        deleteProject,
        filterProjects,
        clearFilteredProjects,
        clearProjects
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
