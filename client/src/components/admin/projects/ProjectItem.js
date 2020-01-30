import React, { Fragment } from "react";

const ProjectItem = ({ project }) => {
  const { name, status, description, date } = project;
  return (
    <Fragment>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{status}</td>
          <td>{description}</td>
          <td>{date}</td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default ProjectItem;
