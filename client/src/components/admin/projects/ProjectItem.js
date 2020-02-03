import React, { Fragment, useContext } from "react";
import Moment from "react-moment";
import ProjectContext from "../../../context/project/projectContext";

const ProjectItem = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { setCurrentProject } = projectContext;
  const { projectName, status, description, date } = project;

  const onEdit = () => setCurrentProject(project);

  return (
    <tbody>
      <tr>
        <td className="text-primary">
          <button className="btn btn-light" title="View Project">
            <i className="fas fa-book-reader"></i>
          </button>{" "}
          <button
            className="btn btn-light"
            data-toggle="modal"
            data-target="#updateProject"
            onClick={onEdit}
          >
            <i className="fas fa-edit"></i>
          </button>{" "}
          {projectName}
        </td>
        <td>{status}</td>
        <td>{description}</td>
        <td>
          <Moment format="MMMM Do YYYY">{date}</Moment>
        </td>
      </tr>
    </tbody>
  );
};

export default ProjectItem;
