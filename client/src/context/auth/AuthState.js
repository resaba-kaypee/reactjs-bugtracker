import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

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
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      // invalid credentials
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Load User
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // check if valid user is logging in
      const res = await axios.get("/api/authUser");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      // invalid credentials
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User (not needed)
  // const register = async formData => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   try {
  //     const res = await axios.post("/api/admin/users", formData, config);

  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data
  //     });

  //     // loadUser();
  //   } catch (err) {
  //     dispatch({
  //       type: REGISTER_FAIL,
  //       payload: err.response.data.msg
  //     });
  //   }
  // };

  // Login User
  const loginAsUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/authUser", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login Admin
  const loginAsAdmin = async formData => {
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
  const logoutUser = async () => {
    dispatch({
      type: LOGOUT
    });
    try {
      await axios.post("/api/user/logout");
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logoutAdmin = async () => {
    dispatch({
      type: LOGOUT
    });
    try {
      await axios.post("/api/admin/logout");
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loginAsAdmin,
        loginAsUser,
        loadAdmin,
        loadUser,
        logoutAdmin,
        logoutUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
