import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "../../../context/project/projectContext";

const ProjectItem = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { setCurrentProject, deleteProject } = projectContext;
  const { _id, projectName, status, description } = project;

  const onEdit = () => {
    setCurrentProject(project);
  };

  const onDelete = () => {
    deleteProject(_id)
  }

  return (
    <Fragment>
      <tr>
        <td className="text-primary">{projectName}</td>
        <td>{status}</td>
        <td>{description}</td>
        <td align="center">
        <button
              className="btn btn-light"
              title="View Project"
              data-toggle="modal"
              data-target="#viewProject"
              onClick={onEdit}
            >
              <i className="fas fa-book-reader"></i>
            </button>{" "}
          <button
            className="btn btn-light"
            title="Update Project"
            data-toggle="modal"
            data-target="#updateProject"
            onClick={onEdit}
          >
            <i className="fas fa-edit"></i>
          </button>{" "}
          <button
          className="btn btn-light"
          title="Delete Project"
          onClick={onDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        </td>
      </tr>
    </Fragment>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectItem;
