import React from "react";
import Resolved from "./tables/Resolved";
import Unresolved from "./tables/Unresolved";
import ReportByMe from "./tables/ReportByMe";
import Updated from "./tables/Updated";
const Overview = () => {
  return (
    <div
      style={{
        marginTop: "20px"
      }}
    >
      <ReportByMe />
      <Resolved />
      <ReportByMe />
      <Updated />
      <Unresolved />
    </div>
  );
};

export default Overview;
