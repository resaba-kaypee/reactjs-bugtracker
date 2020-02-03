import React, { useState, useContext, useEffect } from "react";
import ProjectContext from "../../../../context/project/projectContext";
import AlertContext from "../../../../context/alert/alertContext";

const UpdateProjectForm = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const projectContext = useContext(ProjectContext);
  const {
    getUsers,
    users,
    loading,
    current,
    updateProject,
    clearCurrentProject
  } = projectContext;

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescripton] = useState("");
  const [tech, setTech] = useState("");
  const [isTechUpdating, setIsTechUpdating] = useState(false);

  useEffect(() => {
    getUsers();
    if (current !== null) {
      setProjectName(current.projectName);
      setStatus(current.status);
      setDescripton(current.description);
    }
    //eslint-disable-next-line
  }, [current]);

  const onSubmit = e => {
    e.preventDefault();

    if (projectName === "" || description === "") {
      setAlert("Please fill in the required fields", "danger");
    } else if (!isTechUpdating) {
      const updated = {
        id: current._id,
        projectName,
        status,
        description
      };
      updateProject(updated);
      setAlert("Project successfully upadted!", "success");
    }

    if (isTechUpdating) {
      const addedTech = {
        id: current._id,
        tech
      };
      updateProject(addedTech);
      setAlert("User successfully added!", "success");
    }

    clearAll();
  };

  const clearAll = () => clearCurrentProject();

  return (
    <div className="container">
      <div className="border">
        <div className="card-header bg-primary text-light">
          <span className="h4">
            <i className="far fa-edit"></i> Update Project
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
                      onChange={e => setProjectName(e.target.value)}
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
                      onChange={e => setStatus(e.target.value)}
                      onBlur={e => setStatus(e.target.value)}
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
                        resize: "none"
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Text area"
                      value={description}
                      onChange={e => setDescripton(e.target.value)}
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                      onClick={() => setIsTechUpdating(false)}
                    >
                      Update Project
                    </button>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>
                    <label>Assigned Tech to Project</label>
                  </td>
                  <td>
                    <ul>
                      {/* use current assigned users */}
                      {current !== null && !loading ? (
                        current.techs.map(tech => <li key={tech}>{tech}</li>)
                      ) : (
                        <li>--No assigned tech--</li>
                      )}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    <select
                      className="form-control"
                      name="status"
                      value={tech}
                      onChange={e => setTech(e.target.value)}
                      onBlur={e => setTech(e.target.value)}
                    >
                      <option>--Select---</option>
                      {users !== null && !loading ? (
                        users.map(user => (
                          <option key={user._id} value={user.name}>
                            {user.name}
                          </option>
                        ))
                      ) : (
                        <option>--None--</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary float-right"
                      type="submit"
                      onClick={() => setIsTechUpdating(true)}
                    >
                      Add user to project
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
