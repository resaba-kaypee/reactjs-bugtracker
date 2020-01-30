import React, { useReducer } from "react";
import axios from "axios";
import LogContext from "./logContext";
import logReducer from "./logReducer";

import { GET_LOGS, LOG_ERROR } from "../types";

const LogState = props => { 
  const initialState = {
    logs: null,
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

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        getLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
