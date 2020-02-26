import React, { useContext, useRef, useEffect } from "react";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import IssueContext from "../../../context/issue/issueContext";

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
    <form className="form-inline my-2 my-lg-0 float-right">
      <input
        className="form-control mr-sm-2"
        ref={text}
        type="search"
        placeholder="Search issue..."
        onChange={onChange}
      />
    </form>
  );
};

export default IssueFilter;
