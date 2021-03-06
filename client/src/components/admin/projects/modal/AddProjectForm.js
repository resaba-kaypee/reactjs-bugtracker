import React, { useState, useContext, useEffect } from "react";
import ProjectContext from "../../../../context/project/projectContext";
import AlertContext from "../../../../context/alert/alertContext";

const AddProjectForm = () => {
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { addProject, error, success } = projectContext;

  useEffect(() => {
    if (error && error === "Project already exists") {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (success && success === "Project successfully created!") {
      setAlert(success, "success");
    }
    // eslint-disable-next-line
  }, [success]);

  const [project, setProject] = useState({
    projectName: "",
    status: "",
    description: "",
  });

  const { projectName, status, description } = project;

  const onChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (projectName === "" || description === "") {
      setAlert("Please fill in required fields", "danger");
    } else {
      addProject(project);
      setProject({
        projectName: "",
        status: "",
        description: "",
      });
    }
  };

  return (
    <div>
      <div className="border">
        <div className="card-header bg-dark text-light">
          <span className="h4">
            <i className="fas fa-plus"></i> Create New Project
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <label>Project Name</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="projectName"
                      value={projectName}
                      placeholder="Enter project name..."
                      onChange={onChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Status</label>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={onChange}
                      onBlur={onChange}
                      required
                    >
                      <option value="">--Select---</option>
                      <option value="development">development</option>
                      <option value="release">release</option>
                      <option value="stable">stable</option>
                      <option value="obsolete">obsolete</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Description</label>
                  </td>
                  <td>
                    <textarea
                      style={{
                        resize: "none",
                      }}
                      type="text"
                      name="description"
                      value={description}
                      className="form-control"
                      placeholder="Project Description"
                      onChange={onChange}
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary float-right"
                    >
                      <i className="fas fa-plus"></i> Create
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
