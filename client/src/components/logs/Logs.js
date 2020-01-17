import React, { useContext, useEffect } from "react";
import LogItem from "./LogItem";
import LogContext from "../../context/log/logContext";
import Spinner from "../layout/Spinner";

const Logs = () => {
  const logContext = useContext(LogContext);
  const { logs, getLogs, loading } = logContext;

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (logs !== null && logs.length === 0 && !loading) {
    return <h4>No logs...</h4>;
  }

  return (
    <div>
      <div>
        {logs !== null && !loading ? (
          logs.map(log => (
            <ul className="list-group">
              <li className="list-group-item">
                <LogItem key={log._id} log={log}></LogItem>
              </li>
            </ul>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Logs;
