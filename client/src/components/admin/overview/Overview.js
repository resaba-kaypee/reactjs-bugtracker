import React from "react";
import Resolved from "./tables/Resolved";
import Unresolved from "./tables/Unresolved";
import ReportByMe from "./tables/ReportByMe";

const Overview = () => {
  return (
    <div className="card shadow bg-white rounded" style={{ height: "96vh" }}>
      <div className="card-header bg-info text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-chalkboard"></i> Bugtracker Overview
        </span>
      </div>
      <div className="card-body">
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
