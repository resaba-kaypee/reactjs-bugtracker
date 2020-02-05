import React, { Fragment } from "react";

const ViewProjectIssueList = ({ issue }) => {
  const { projectName, description, status } = issue;
  return (
    <Fragment>
      <li className="list-group-item">
        {projectName} {description} {status}
      </li>
    </Fragment>
  );
};

export default ViewProjectIssueList;
