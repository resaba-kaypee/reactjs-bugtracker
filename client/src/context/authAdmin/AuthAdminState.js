import React, { useReducer } from "react";
import axios from "axios";
import AuthAdminContext from "./authAdminContext";
import authAdminReducer from "./authAdminReducer";
// import setAuthToken from "../../utils/setAuthToken";

import {
  GET_ALL_USERS,
  USERS_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_FILTER,
  DELETE_USER,
  LOGOUT,
  // ADMIN_LOADED,
  // AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // CLEAR_SUCCESS,
  // UPDATE_ISSUE,
  // ISSUE_ERROR,
  // GET_ISSUES,
  // FILTER_ISSUES,
  // CLEAR_ISSUES,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // ADD_ISSUE,
  // ADD_COMMENT,
  // DELETE_ISSUE,
} from "../types";

const AuthAdminState = props => {
  const initialState = {
    // token: localStorage.getItem("token"),
    // isAuthenticated: null,
    // admin: null,
    users: null,
    // issues: null,
    loading: true,
    error: null,
    // success: null,
    filtered: null
    // current: null
  };

  const [state, dispatch] = useReducer(authAdminReducer, initialState);

  // Load Admin (not needed)
  // const loadAdmin = async () => {
  //   // load token into global headers
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

  //   try {
  //     // check if valid admin is logging in
  //     const res = await axios.get("/api/authAdmin");

  //     dispatch({
  //       type: ADMIN_LOADED,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     // invalid credentials
  //     dispatch({ type: AUTH_ERROR });
  //   }
  // };

  // Register Admin (not needed)
  // const registerAdmin = async formData => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   try {
  //     const res = await axios.post(
  //       "/api/admin/registerAdmin",
  //       formData,
  //       config
  //     );

  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data.msg
  //     });

  //     // loadAdmin();
  //   } catch (err) {
  //     dispatch({
  //       type: REGISTER_FAIL,
  //       payload: err.data.msg
  //     });
  //   }
  // };

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
        type: REGISTER_USER,
        payload: res.data
      });
 
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Get all users
  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({ type: USERS_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete registered user
  const deleteUser = async id => {
    try {
      await axios.delete(`/api/admin/deleteUser/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({ type: USERS_ERROR, payload: err.response.data.msg });
    }
  };

  // Login Admin (not needed)
  // const login = async formData => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   try {
  //     const res = await axios.post("/api/authAdmin", formData, config);

  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data
  //     });

  //     loadAdmin();
  //   } catch (err) {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: err.response.data.msg
  //     });
  //   }
  // };

  /**
   * ********************************************************** ISSUES
   */

  // Add issue
  // const addIssue = async issue => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   try {
  //     const res = await axios.post("/api/admin/issue", issue, config);
  //     dispatch({ type: ADD_ISSUE, payload: res.data });
  //   } catch (err) {
  //     dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
  //   }
  // };

  // Update issue
  // const updateIssue = async issue => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json"
  //     }
  //   };
  //   try {
  //     const res = await axios.put(
  //       `/api/admin/update/${issue.id}`,
  //       issue,
  //       config
  //     );
  //     dispatch({ type: UPDATE_ISSUE, payload: res.data });
  //   } catch (err) {
  //     console.log(err.response.data.msg)
  //     dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
  //   }
  // };

  // Add comment to issue
  // const addComment = async comment => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json"
  //     }
  //   };
  //   try {
  //     const res = await axios.put(
  //       `/api/admin/comment/${comment.id}`,
  //       comment,
  //       config
  //     );
  //     dispatch({ type: ADD_COMMENT, payload: res.data });
  //   } catch (err) {
  //     console.log(err.response.data.msg)
  //     dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
  //   }
  // };

  // Delete issue
  // const deleteIssue = async id => {
  //   try {
  //     await axios.delete(`/api/admin/issues/${id}`);
  //     dispatch({ type: DELETE_ISSUE, payload: id });
  //   } catch (err) {
  //     console.log(err.response.data.msg)
  //     dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
  //   }
  // };

  // Set current issue
  // const setCurrent = issue => dispatch({ type: SET_CURRENT, payload: issue });

  // Clear current issue
  // const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Success
  // const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

  // Clear issue
  // const clearIssues = () => dispatch({ type: CLEAR_ISSUES });

  // Filter issues
  // const filterIssues = text => dispatch({ type: FILTER_ISSUES, payload: text });

  // Clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <AuthAdminContext.Provider
      value={{
        // token: state.token,
        // isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        users: state.users,
        // admin: state.admin,
        error: state.error,
        // issues: state.issues,
        // success: state.success,
        filtered: state.filtered,
        // current: state.current,
        // loadAdmin,
        // registerAdmin,
        registerUser,
        // login,
        logout,
        // setCurrent,
        // filterIssues,
        clearErrors,
        // clearSuccess,
        // clearIssues,
        clearFilter,
        // clearCurrent,
        // addIssue,
        // updateIssue,
        // deleteIssue,
        // addComment,
        getAllUsers,
        deleteUser
      }}
    >
      {props.children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminState;
