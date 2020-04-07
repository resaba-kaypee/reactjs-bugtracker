import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
// components
import LogItem from "./LogItem";
import LogFilter from "./LogFilter";
import Spinner from "../../../assets/img/spinner.gif";
// state | context
import AuthContext from "../../../context/auth/authContext";
import LogContext from "../../../context/log/logContext";

const Logs = () => {
  const logContext = useContext(LogContext);
  const { logs, filtered, getLogs, loading } = logContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

 
  if (user && user.role !== "admin") {
    return <Redirect to={`/dashboard/home/${user.role}`} />;
  }

  return (
    <div className="card card-custom shadow bg-white rounded">
      <div className="card-header bg-dark text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-list-alt"></i> Viewing User Logs
        </span>
      </div>
      <div className="card-body">
        <nav className="navbar shadow bg-white rounded">
          <LogFilter />
        </nav>
        <div className="card-body card-body-list">
          <div className="table-responsive">
            <table className="table">
              <thead></thead>
              <tbody>
                {logs !== null && !loading ? (
                  filtered !== null ? (
                    filtered.map(log => (
                      <tr key={log._id}>
                        <LogItem log={log} />
                      </tr>
                    ))
                  ) : (
                    logs.map(log => (
                      <tr key={log._id}>
                        <LogItem log={log} />
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
    </div>
  );
};

export default Logs;
