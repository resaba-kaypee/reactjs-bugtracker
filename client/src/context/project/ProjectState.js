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
  SET_CURRENT_PROJECT,
  CLEAR_CURRENT_PROJECT,
  GET_USERS,
  REMOVE_USER,
  USERS_ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    users: null,
    error: null,
    filtered: null,
    current: null,
    loading: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all project
  const getProjects = async () => {
    try {
      const res = await axios.get("/api/admin/projects");
      dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err });
    }
  };

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

  // Update project
  const updateProject = async project => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/admin/project/${project._id}`,
        project,
        config
      );
      dispatch({ type: UPDATE_PROJECT, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg });
    }
  };

  // Delete project
  const deleteProject = async _id => {
    try {
      await axios.delete(`/api/admin/project/${_id}`);
      dispatch({ type: DELETE_PROJECT, payload: _id });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg });
    }
  };

  // Filter projects
  const filterProjects = text => {
    dispatch({ type: FILTER_PROJECTS, payload: text });
  };

  // Clear filtered issues
  const clearFilteredProjects = () => {
    dispatch({ type: CLEAR_FILTERED_PROJECTS });
  };

  // Set current updating project
  const setCurrentProject = project => {
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

  // Get all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: USERS_ERROR, payload: err });
    }
  };

  const removeUser = async project => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/admin/removeTech/${project._id}`,
        project,
        config
      );
      dispatch({ type: REMOVE_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        filtered: state.filtered,
        users: state.users,
        errors: state.errors,
        loading: state.loading,
        current: state.current,
        addProject,
        getProjects,
        updateProject,
        deleteProject,
        filterProjects,
        clearFilteredProjects,
        clearProjects,
        setCurrentProject,
        clearCurrentProject,
        getUsers,
        removeUser
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
