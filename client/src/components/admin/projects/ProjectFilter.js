import React, { useContext, useRef, useEffect } from "react";
import ProjectContext from "../../../context/project/projectContext";

const IssueFilter = () => {
  const projectContext = useContext(ProjectContext);
  const { filterProjects, clearFilteredProjects, filtered } = projectContext;
  const text = useRef("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      filterProjects(e.target.value);
    } else {
      clearFilteredProjects();
    }
  };

  return (
    <form>
      <input
        className="rounded"
        ref={text}
        type="text"
        placeholder="Filter project..."
        onChange={onChange}
      />
    </form>
  );
};

export default IssueFilter;
