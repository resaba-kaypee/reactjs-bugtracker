/*
*might add sort by date/severity/asc/desc
*/

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
