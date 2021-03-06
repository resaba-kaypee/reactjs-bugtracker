import React, { useState, useContext, useEffect } from "react";
import UpdateProjectFormTech from "./UpdateProjectFormTech";
import ProjectContext from "../../../../context/project/projectContext";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import AlertContext from "../../../../context/alert/alertContext";

const UpdateProjectForm = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const projectContext = useContext(ProjectContext);
  const authAdminContext = useContext(AuthAdminContext);

  const {
    loading,
    current,
    projects,
    getProjects,
    updateProject,
    addUser,
    success,
    error,
    clearProjectError
  } = projectContext;

  const { getAllUsers, users } = authAdminContext;

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescripton] = useState("");
  const [tech, setTech] = useState("");
  const [isTechUpdating, setIsTechUpdating] = useState(false);

  useEffect(() => {
    getAllUsers();
    getProjects();

    if (current !== null) {
      setProjectName(current.projectName);
      setStatus(current.status);
      setDescripton(current.description);
    }

    if (error && error === "Tech already added in the list") {
      setAlert(error, "danger");
    }

    if (success && success === "Project successfully updated!") {
      setAlert(success, "success");
    } else if (success && success === "User successfully added!") {
      setAlert(success, "success");
    }

    const clear = setTimeout(() => clearProjectError(), 1000);
    return () => clearTimeout(clear);

    // eslint-disable-next-line
  }, [current, error, success]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      if (!isTechUpdating) {
        updateHandler();
      } else {
        addUserHandler();
      }
    }
  };

  const updateHandler = () => {
    if (projectName === "" || description === "") {
      setAlert("Please fill in the required fields", "danger");
    } else if (!isTechUpdating) {
      const updated = {
        _id: current._id,
        projectName,
        status,
        description,
      };
      updateProject(updated);
    }
  };

  const addUserHandler = () => {
    if (isTechUpdating && tech !== "") {
      const addedTech = {
        _id: current._id,
        tech,
      };
      addUser(addedTech);
    } else if (tech === "") {
      setAlert("Please select from the list", "danger");
    }
  };

  return (
    <div>
      <div className="border">
        <div className="card-header bg-dark text-light">
          <span className="h4">
            <i className="fas fa-edit"></i> Update Project
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
                      type="text"
                      className="form-control"
                      placeholder="Bugtracker"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
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
                      onChange={(e) => setStatus(e.target.value)}
                      onBlur={(e) => setStatus(e.target.value)}
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
                      className="form-control"
                      placeholder="Text area"
                      value={description}
                      onChange={(e) => setDescripton(e.target.value)}
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-outline-primary float-right"
                      onClick={() => setIsTechUpdating(false)}
                    >
                      <i className="fas fa-sync-alt"></i> Update Project
                    </button>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>
                    <label>Assigned Tech to Project</label>
                  </td>
                  <td style={{ overflowY: "scroll" }}>
                    <ul className="list-group">
                      {/* use project assigned users */}
                      {projects !== null &&
                        projects.length > 0 &&
                        projects.map(
                          (project) =>
                            project.projectName === projectName && (
                              <UpdateProjectFormTech
                                key={project._id}
                                techs={project.techs}
                                projectID={project._id}
                              />
                            )
                        )}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select
                      className="form-control"
                      name="tech"
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      onBlur={(e) => setTech(e.target.value)}
                    >
                      <option>--Select---</option>
                      {users !== null && !loading ? (
                        users.map((user) => (
                          <option
                            key={user._id}
                            value={user.firstName + " " + user.lastName}
                          >
                            {user.firstName} {user.lastName}
                          </option>
                        ))
                      ) : (
                        <option>--None--</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary float-right"
                      type="submit"
                      onClick={() => setIsTechUpdating(true)}
                    >
                      <i className="fas fa-user-plus"></i> Add user to project
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

export default UpdateProjectForm;
