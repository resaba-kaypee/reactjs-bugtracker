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
  CLEAR_ERRORS
} from "../types";

const AuthAdminState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    admin: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authAdminReducer, initialState);

  // Load Admin
  const loadAdmin = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // check if valid user is logging in
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
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/admin/register", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadAdmin();
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

  return (
    <AuthAdminContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        admin: state.admin,
        error: state.error,
        loadAdmin,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminState;
