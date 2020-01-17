import React, { useReducer } from "react";
import axios from "axios";
import LogContext from "./logContext";
import logReducer from "./logReducer";

import { LOG_FAIL, SEND_LOG, GET_LOGS, LOG_ERROR } from "../types";

const LogState = props => {
  const initialState = {
    logs: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Add log
  const sendLog = async data => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/logs", data, config);
      dispatch({
        type: SEND_LOG,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOG_FAIL,
        payload: err.response.data.msg
      });
    }
  };

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
        sendLog,
        getLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
