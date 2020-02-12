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
    <form className="form-inline my-2 my-lg-0 float-right">
      <input
        className="form-control mr-sm-2"
        ref={text}
        type="search"
        placeholder="Search project..."
        onChange={onChange}
      />
    </form>
  );
};

export default IssueFilter;
