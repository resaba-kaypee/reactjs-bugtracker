import React, { useReducer } from "react";
import uuid from "uuid";
import IssueContext from "./issueContext";
import issueReducer from "./issueReducer";
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ISSUES,
  FILTER_ISSUES,
  CLEAR_FILTER
} from "../types";

const IssueState = props => {
  const initialState = {
    issues: [
      // hard coded sample issues
      {
        id: 1,
        description: "Failed to save",
        severity: "medium",
        status: "open",
        assignedTo: "Jack"
      },
      {
        id: 2,
        description: "Failed to load",
        severity: "low",
        status: "open",
        assignedTo: "Jill"
      },
      {
        id: 3,
        description: "Failed to initiate",
        severity: "high",
        status: "open",
        assignedTo: "Jake"
      }
    ]
  };

  const [state, dispatch] = useReducer(issueReducer, initialState);

  // Add issue

  // Delete issue

  // Set current issue

  // Clear current issue

  // Update issue

  // Filter issues

  // Clear filter

  return (
    <IssueContext.Provider
      value={{
        issues: state.issues
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};

export default IssueState