import React, { useContext, useRef, useEffect } from "react";
import ProjectContext from "../../../context/project/projectContext";

const IssueFilter = () => {
  const projectContext = useContext(ProjectContext);
  const { filterIssues, clearFilter, filtered } = projectContext;
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
