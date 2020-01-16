import React, { useReducer } from "react";
import axios from "axios";
import LogContext from "./logContext";
import logReducer from "./logReducer";


import {
  LOG_FAIL,
  LOG_SUCCESS
} from "../types";

const LogState = props => {
  const initialState = {
    actions: [
      {
        id: 1,
        action: "Sam Smith just logged in",
        date: "2020-01-10T19:01:48.999Z"
      },
      {
        id: 2,
        action: "Sam Smith just logged out",
        date: "2020-01-10T19:01:48.999Z"
      },
      {
        id: 3,
        action: "Kevin Ng just logged in",
        date: "2020-01-10T19:01:48.999Z"
      }
    ]
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Register Admin
  const sendLog = async data => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/log", data, config);

      dispatch({
        type: LOG_SUCCESS,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: LOG_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  return (
    <LogContext.Provider
      value={{
        actions: state.actions,
        sendLog
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
