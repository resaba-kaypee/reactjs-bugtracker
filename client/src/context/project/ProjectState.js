import React, { useReducer } from "react";
import axios from "axios";
import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
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

const ProjectState = props => {
  const initialState = {
    projects: null,
    errors: null,
    filtered: null,
    loading: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Add project
  const addProject = async project => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/admin/project", project, config);
      dispatch({ type: ADD_PROJECT, payload: res.data });
    } catch (err) {
      dispatch({ PROJECT_ERROR, payload: err.response.msg });
    }
  };

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
  const filterProjects = text => {
    dispatch({ type: FILTER_PROJECTS, payload: text });
  };

  // Clear filtered issues
  const clearFilteredProjects = () => {
    dispatch({ type: CLEAR_FILTERED_PROJECTS });
  };

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
