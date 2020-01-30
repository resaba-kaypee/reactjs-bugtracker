import React, { Fragment } from "react";
import Moment from "react-moment";

const ProjectItem = ({ project }) => {
  const { projectName, status, description, date } = project;
  return (
    <Fragment>
      <tbody>
        <tr>
          <td>{projectName}</td>
          <td>{status}</td>
          <td>{description}</td>
          <td>
            <Moment format="MMMM Do YYYY">{date}</Moment>
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default ProjectItem;
