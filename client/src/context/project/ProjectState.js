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
  CLEAR_PROJECTS,
  CLEAR_ERRORS,
  SET_CURRENT_PROJECT,
  CLEAR_CURRENT_PROJECT,
  REMOVE_USER,
  ADD_USER,
} from "../types";

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    success: null,
    error: null,
    filtered: null,
    current: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all project
  const getProjects = async () => {
    try {
      const res = await axios.get("/api/admin/projects");
      dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Add project
  const addProject = async (project) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/admin/project", project, config);
      dispatch({ type: ADD_PROJECT, payload: res.data});
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Update project
  const updateProject = async (project) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/admin/project/${project._id}`,
        project,
        config
      );
      dispatch({ type: UPDATE_PROJECT, payload: res.data});
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Assigned user projects
  const addUser = async (project) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/admin/addTech/${project._id}`,
        project,
        config
      );
      dispatch({ type: ADD_USER, payload: res.data});
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Remove user from assigned projects
  const removeUser = async (project) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/admin/removeTech/${project._id}`,
        project,
        config
      );
      dispatch({ type: REMOVE_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete project
  const deleteProject = async (_id) => {
    try {
      await axios.delete(`/api/admin/project/${_id}`);
      dispatch({ type: DELETE_PROJECT, payload: _id });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data.msg });
    }
  };

  // Filter projects
  const filterProjects = (text) => {
    dispatch({ type: FILTER_PROJECTS, payload: text });
  };

  // Clear filtered issues
  const clearFilteredProjects = () => {
    dispatch({ type: CLEAR_FILTERED_PROJECTS });
  };

  // Set current updating project
  const setCurrentProject = (project) => {
    dispatch({ type: SET_CURRENT_PROJECT, payload: project });
  };

  // Clear current updating project
  const clearCurrentProject = () => {
    dispatch({ type: CLEAR_CURRENT_PROJECT });
  };

  // Clear projects when logging out
  const clearProjects = () => {
    dispatch({ type: CLEAR_PROJECTS });
  };

  // Clear error
  const clearProjectError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        filtered: state.filtered,
        success: state.success,
        error: state.error,
        loading: state.loading,
        current: state.current,
        addProject,
        getProjects,
        updateProject,
        deleteProject,
        filterProjects,
        clearFilteredProjects,
        clearProjects,
        clearProjectError,
        setCurrentProject,
        clearCurrentProject,
        removeUser,
        addUser,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
