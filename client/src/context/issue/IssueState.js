import React, { useReducer } from "react";
import axios from "axios";
import IssueContext from "./issueContext";
import issueReducer from "./issueReducer";
import {
  GET_USERS_ISSUES,
  GET_ISSUES,
  ADD_ISSUE,
  UPDATE_ISSUE,
  ADD_COMMENT,
  DELETE_ISSUE,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_ISSUES,
  CLEAR_FILTER,
  CLEAR_ISSUES,
  ISSUE_ERROR
} from "../types";

const IssueState = props => {
  const initialState = {
    usersIssue: null,
    issues: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(issueReducer, initialState);

  // Get user's issue
  const getMyIssues = async () => {
    try {
      const res = await axios.get("/api/issues/reportbyme");
      dispatch({ type: GET_USERS_ISSUES, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
    }
  };

  // Get issue
  const getIssues = async () => {
    try {
      const res = await axios.get("/api/issues");
      dispatch({ type: GET_ISSUES, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
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
      const res = await axios.post("/api/issues", issue, config);
      dispatch({ type: ADD_ISSUE, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
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
      const res = await axios.put(`/api/issues/${issue.id}`, issue, config);
      dispatch({ type: UPDATE_ISSUE, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
    }
  };

  // Add comment to issue
  const addComment = async comment => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/issues/comment/${comment.id}`, comment, config);
      dispatch({ type: ADD_COMMENT, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete issue
  const deleteIssue = async id => {
    try {
      await axios.delete(`/api/issues/${id}`);
      dispatch({ type: DELETE_ISSUE, payload: id });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.data.msg });
    }
  };

  // Clear issue
  const clearIssues = () => {
    dispatch({ type: CLEAR_ISSUES });
  };

  // Set current issue
  const setCurrent = issue => {
    dispatch({ type: SET_CURRENT, payload: issue });
  };

  // Clear current issue
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter issues
  const filterIssues = text => {
    dispatch({ type: FILTER_ISSUES, payload: text });
  };

  // Clear filter
  const clearFilter = issue => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <IssueContext.Provider
      value={{
        usersIssue: state.usersIssue,
        issues: state.issues,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getMyIssues,
        getIssues,
        addIssue,
        updateIssue,
        addComment,
        deleteIssue,
        clearIssues,
        setCurrent,
        clearCurrent,
        filterIssues,
        clearFilter
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};

export default IssueState;
