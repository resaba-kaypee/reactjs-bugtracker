/*
*might add sort by date/severity/asc/desc
*/

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
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter issue..."
        onChange={onChange}
      />
    </form>
  );
};

export default IssueFilter;
