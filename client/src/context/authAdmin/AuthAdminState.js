import React, { useReducer } from "react";
import axios from "axios";
import AuthAdminContext from "./authAdminContext";
import authAdminReducer from "./authAdminReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  UPDATE_ISSUE,
  ISSUE_ERROR,
  GET_ISSUES,
  FILTER_ISSUES,
  CLEAR_FILTER,
  CLEAR_ISSUES,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_ISSUE,
  DELETE_ISSUE
} from "../types";

const AuthAdminState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    admin: null,
    issues: null,
    loading: true,
    error: null,
    success: null,
    filtered: null,
    current: null
  };

  const [state, dispatch] = useReducer(authAdminReducer, initialState);

  // Load Admin
  const loadAdmin = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // check if valid admin is logging in
      const res = await axios.get("/api/authAdmin");

      dispatch({
        type: ADMIN_LOADED,
        payload: res.data
      });
    } catch (err) {
      // invalid credentials
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register Admin
  const registerAdmin = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        "/api/admin/registerAdmin",
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.msg
      });

      // loadAdmin();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.data.msg
      });
    }
  };

  // Register User
  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/admin/registerUser", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.msg
      });

      // loadAdmin();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login Admin
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/authAdmin", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadAdmin();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  /**
   * ********************************************************** ISSUES
   */
  // Get issue
  const getIssues = async () => {
    try {
      const res = await axios.get("/api/admin/issues");
      dispatch({ type: GET_ISSUES, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
    }
  };

  // Add issue
  const addIssue = async issue => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/admin/issue", issue, config);
      dispatch({ type: ADD_ISSUE, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
    }
  };

  // Update issue
  const updateIssue = async issue => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/admin/update/${issue.id}`,
        issue,
        config
      );
      dispatch({ type: UPDATE_ISSUE, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
    }
  };

  // Delete issue
  const deleteIssue = async id => {
    try {
      await axios.delete(`/api/admin/issues/${id}`);
      dispatch({ type: DELETE_ISSUE, payload: id });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
    }
  };

  // Set current issue
  const setCurrent = issue => dispatch({ type: SET_CURRENT, payload: issue });

  // Clear current issue
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Success
  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  // Clear issue
  const clearIssues = () => dispatch({ type: CLEAR_ISSUES });

  // Filter issues
  const filterIssues = text => dispatch({ type: FILTER_ISSUES, payload: text });

  // Clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <AuthAdminContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        admin: state.admin,
        error: state.error,
        issues: state.issues,
        success: state.success,
        filtered: state.filtered,
        current: state.current,
        loadAdmin,
        registerAdmin,
        registerUser,
        login,
        logout,
        setCurrent,
        filterIssues,
        clearErrors,
        clearSuccess,
        clearIssues,
        clearFilter,
        clearCurrent,
        addIssue,
        updateIssue,
        getIssues,
        deleteIssue
      }}
    >
      {props.children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminState;
