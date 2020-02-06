import React, { Fragment } from "react";

const ViewProjectIssueList = ({ issue }) => {
  const { description } = issue;
  return (
    <Fragment>
      <li className="list-group-item">
        <strong>Summary: </strong>{description}
      </li>
    </Fragment>
  );
};

export default ViewProjectIssueList;
