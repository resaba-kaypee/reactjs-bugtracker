import React, { Fragment, useContext, useEffect } from "react";
import LogItem from "./LogItem";
import LogContext from "../../context/log/logContext";
import Spinner from "../layout/Spinner";

const Logs = () => {
  const logContext = useContext(LogContext);
  const { actions } = logContext;
  return (
    <div>
      <div>
        {actions.map(action => (
          <ul className="list-group">
            <li className="list-group-item">
              <LogItem key={action.id} log={action}></LogItem>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Logs;
