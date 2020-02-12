import React, { useContext, useEffect } from "react";
import LogItem from "./LogItem";
import LogFilter from "./LogFilter";
import Spinner from "../../../assets/img/spinner.gif"
import LogContext from "../../../context/log/logContext";

const Logs = () => {
  const logContext = useContext(LogContext);
  const { logs, filtered, getLogs, loading } = logContext;

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (logs !== null && logs.length === 0 && !loading) {
    return <h4>No logs...</h4>;
  }

  return (
    <div
      className="card shadow bg-white rounded"
      style={{
        marginTop: "20px"
      }}
    >
      <div className="card-header bg-primary text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Viewing User Logs
        </span>
      </div>
      <div className="card-body">
        <nav className="navbar shadow bg-white rounded">
          <LogFilter />
        </nav>
        <div
          className="card-body"
          style={{
            maxHeight: "400px",
            overflowY: "scroll"
          }}
        >
          <table className="table table-bordered">
            <thead></thead>
            <tbody>
              {logs !== null && !loading ? (
                filtered !== null ? (
                  filtered.map(log => (
                    <tr>
                      <LogItem key={log._id} log={log} />
                    </tr>
                  ))
                ) : (
                  logs.map(log => (
                    <tr>
                      <LogItem key={log._id} log={log} />
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" align="center">
                    <img src={Spinner} alt="spinner" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;
