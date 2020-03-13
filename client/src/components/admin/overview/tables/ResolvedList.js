import React, { Fragment } from "react";

const ResolvedList = ({ issue }) => {
  const { _id, projectName, description, priority, date } = issue;

  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{projectName}</td>
        <td>{description}</td>
        <td>{priority}</td>
        <td>{date}</td>
      </tr>
    </Fragment>
  );
};

export default ResolvedList;
