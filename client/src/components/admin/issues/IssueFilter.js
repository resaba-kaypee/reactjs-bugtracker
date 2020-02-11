import React, { useContext, useRef, useEffect } from "react";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";

const IssueFilter = () => {
  const authAdminContext = useContext(AuthAdminContext);
  const { filterIssues, clearFilter, filtered } = authAdminContext;
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
