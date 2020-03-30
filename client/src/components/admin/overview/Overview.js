import React from "react";
import Resolved from "./tables/Resolved";
import Unresolved from "./tables/Unresolved";
import ReportByMe from "./tables/ReportByMe";

const Overview = () => {
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
