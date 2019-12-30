import React, { useReducer } from "react";
import axios from "axios";
import IssueContext from "./issueContext";
import issueReducer from "./issueReducer";
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ISSUE,
  FILTER_ISSUES,
  CLEAR_FILTER,
  ISSUE_ERROR
} from "../types";

const IssueState = props => {
  const initialState = {
    issues: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(issueReducer, initialState);

  // Add issue
  const addIssue = async issue => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/issues", issue, config);
      dispatch({ type: ADD_ISSUE, payload: res.data });
    } catch (err) {
      dispatch({ type: ISSUE_ERROR, payload: err.response.msg });
    }
  };

  // Delete issue
  const deleteIssue = id => {
    dispatch({ type: DELETE_ISSUE, payload: id });
  };

  // Set current issue
  const setCurrent = issue => {
    dispatch({ type: SET_CURRENT, payload: issue });
  };

  // Clear current issue
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update issue
  const updateIssue = issue => {
    dispatch({ type: UPDATE_ISSUE, payload: issue });
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
        issues: state.issues,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addIssue,
        deleteIssue,
        setCurrent,
        clearCurrent,
        updateIssue,
        filterIssues,
        clearFilter
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};

export default IssueState;
