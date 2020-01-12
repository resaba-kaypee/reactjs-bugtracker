import React, { useContext, useEffect } from "react";
import Issues from "../issues/Issues";
import IssueFilter from "../issues/IssueFilter";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";

const AdminHome = () => {
  const authAdminContext = useContext(AuthAdminContext);

  useEffect(() => {
    authAdminContext.loadAdmin();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>
        <IssueFilter />
        <button type="button" className="btn btn-secondary btn-block" data-toggle="modal" data-target="#addIssue">
          Add Issue
        </button>
        <hr/>
        <Issues />
      </div>
    </div>
  );
};

export default AdminHome;
