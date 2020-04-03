import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
// component
import Resolved from "./tables/Resolved";
import Unresolved from "./tables/Unresolved";
import ReportByMe from "./tables/ReportByMe";
// state | context
import AuthContext from "../../context/auth/authContext";

const Overview = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { role } = useParams();

  if (user && user.role !== role) {
    return <Redirect push to={`/dashboard/home/${user.role}`} />;
  }

  return (
    <div className="card card-custom shadow bg-white rounded">
      <div
        className="card-header bg-dark
       text-light shadow-sm"
      >
        <span className="h4">
          <i className="fas fa-chalkboard"></i> Bugtracker Overview
        </span>
      </div>
      <div className="card-body" style={{ overflowY: "scroll" }}>
        <div>
          <ReportByMe />
          <Resolved />
          <Unresolved />
        </div>
      </div>
    </div>
  );
};

export default Overview;
