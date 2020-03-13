import React from "react";
import Resolved from "./tables/Resolved";
import Unresolved from "./tables/Unresolved";
import ReportByMe from "./tables/ReportByMe";

const Overview = () => {
  return (
    <div
      style={{
        marginTop: "20px"
      }}
    >
      <ReportByMe />
      <Resolved />
      <Unresolved />
    </div>
  );
};

export default Overview;
