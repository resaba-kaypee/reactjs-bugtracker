import React, { useContext, useRef, useEffect } from "react";
import IssueContext from "../../context/issue/issueContext";

const IssueFilter = () => {
  const issueContext = useContext(IssueContext);
  const { filterIssues, clearFilter, filtered } = issueContext;
  const text = useRef("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      filterIssues(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <span>
      <input
        className="rounded"
        ref={text}
        type="text"
        placeholder="Filter issue..."
        onChange={onChange}
      />
    </span>
  );
};

export default IssueFilter;
