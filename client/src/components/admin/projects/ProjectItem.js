import React, { useContext } from "react";
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
    deleteProject(_id);
  };

  const fontWeight = {
    fontWeight: 600
  };

  return (
    <div className="shadow border-info">
      <div
        className="card-header bg-secondary text-light"
        style={{
          padding: "0.25rem 1.25rem"
        }}
      >
        <span className="h5">
          <i className="fas fa-puzzle-piece"></i> {projectName}
        </span>
      </div>
      <div className="card-body p-0">
        <table className="table table-bordered">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <label style={fontWeight}>ID:</label>
              </td>
              <td>
                <span className="form-control bg-transparent">{_id}</span>
              </td>
            </tr>

            <tr>
              <td>
                <label style={fontWeight}>Description:</label>
              </td>
              <td>
                <textarea
                  style={{
                    resize: "none"
                  }}
                  type="text"
                  value={description}
                  className="form-control bg-transparent"
                  readOnly
                ></textarea>
              </td>
            </tr>

            <tr>
              <td>
                <label style={fontWeight}>Status:</label>
              </td>
              <td>
                <span className="form-control bg-transparent">{status}</span>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="end">
                <button
                  className="btn btn-outline-primary btn-sm"
                  data-toggle="modal"
                  data-target="#viewProject"
                  onClick={onEdit}
                >
                  <i className="fas fa-edit"></i> View
                </button>{" "}
                <button
                  className="btn btn-outline-primary btn-sm"
                  data-toggle="modal"
                  data-target="#updateProject"
                  onClick={onEdit}
                >
                  <i className="fas fa-edit"></i> Update
                </button>{" "}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={onDelete}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectItem;
