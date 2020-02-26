import React, { useReducer } from "react";
import axios from "axios";
import LogContext from "./logContext";
import logReducer from "./logReducer";

import {
  GET_LOGS,
  LOG_ERROR,
  FILTER_LOGS,
  CLEAR_FILTERED_LOGS
} from "../types";

const LogState = props => {
  const initialState = {
    logs: [
      {
        _id: "001",
        firstName: "Sam",
        lastName: "Smith",
        role: "admin",
        action: "just logged in",
        date: "2020-01-10T13:07:10.257+00:00"
      },
      {
        _id: "002",
        firstName: "Sam",
        lastName: "Smith",
        role: "admin",
        action: "just logged in",
        date: "2020-01-10T13:07:10.257+00:00"
      },
      {
        _id: "003",
        firstName: "Sam",
        lastName: "Smith",
        role: "admin",
        action: "just updated in project",
        date: "2020-01-10T13:07:10.257+00:00"
      }
    ],
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Get logs
  const getLogs = async () => {
    try {
      const res = await axios.get("/api/logs");
      dispatch({ type: GET_LOGS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR, payload: err.response.data.msg });
    }
  };

  // Filter logs
  const filterLogs = text => {
    dispatch({ type: FILTER_LOGS, payload: text });
  };

  // Clear filtered logs
  const clearFilteredLogs = () => {
    dispatch({ type: CLEAR_FILTERED_LOGS });
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        error: state.error,
        filtered: state.filtered,
        getLogs,
        filterLogs,
        clearFilteredLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
