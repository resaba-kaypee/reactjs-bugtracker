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
  CLEAR_SUCCESS
} from "../types";

const AuthAdminState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    admin: null,
    loading: true,
    error: null,
    success: null
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
      const res = await axios.post("/api/admin/registerAdmin", formData, config);

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

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  
  // Clear Success
  const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  return (
    <AuthAdminContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        admin: state.admin,
        error: state.error,
        success: state.success,
        loadAdmin,
        registerAdmin,
        registerUser,
        login,
        logout,
        clearErrors,
        clearSuccess
      }}
    >
      {props.children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminState;
