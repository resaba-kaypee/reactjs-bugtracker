import React, { useReducer } from "react";
import axios from "axios";
import AuthAdminContext from "./authAdminContext";
import authAdminReducer from "./authAdminReducer";

import {
  GET_ALL_USERS,
  USERS_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_FILTER,
  DELETE_USER
} from "../types";

const AuthAdminState = (props) => {
  const initialState = {
    users: null,
    loading: true,
    success: null,
    error: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(authAdminReducer, initialState);

  // Register User
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/admin/registerUser", formData, config);

      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
      console.log(res);
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get all users
  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: USERS_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete registered user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/deleteUser/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: USERS_ERROR, payload: err.response.data.msg });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <AuthAdminContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        success: state.success,
        error: state.error,
        filtered: state.filtered,
        registerUser,
        clearErrors,
        clearFilter,
        getAllUsers,
        deleteUser,
      }}
    >
      {props.children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminState;
