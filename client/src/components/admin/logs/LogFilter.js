import React, { useContext, useEffect, useRef } from "react";
import LogContext from "../../../context/log/logContext";

const LogFilter = () => {
  const logContext = useContext(LogContext);
  const { filterLogs, filtered, clearFilteredLogs } = logContext;
  const text = useRef("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      filterLogs(e.target.value);
    } else {
      clearFilteredLogs();
    }
  };
  return (
    <form className="form-inline my-2 my-lg-0 float-right">
      <input
        className="form-control mr-sm-2"
        ref={text}
        type="search"
        placeholder="Search logs..."
        onChange={onChange}
      />
    </form>
  );
};

export default LogFilter;
