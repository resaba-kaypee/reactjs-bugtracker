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
    logs: null,
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
      dispatch({ type: LOG_ERROR, payload: err.response.msg });
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
