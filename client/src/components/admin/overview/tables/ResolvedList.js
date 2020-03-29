import React, { Fragment } from "react";
import Moment from "react-moment";

const ResolvedList = ({ issue }) => {
  const { _id, projectName, description, priority, date } = issue;

  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{projectName}</td>
        <td>{description}</td>
        <td>{priority}</td>
        <td>
          <Moment format="MMMM Do YYYY, h:mm:ss a" date={date} />
        </td>
      </tr>
    </Fragment>
  );
};

export default ResolvedList;
