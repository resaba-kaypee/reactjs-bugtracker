import React, { useState, useContext, useEffect } from "react";
import Moment from "react-moment";
// state | context
import AlertContext from "../../../../context/alert/alertContext";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import ProjectContext from "../../../../context/project/projectContext";

const AddIssueForm = () => {
  const alertContext = useContext(AlertContext);
  const authAdminContext = useContext(AuthAdminContext);
  const projectContext = useContext(ProjectContext);
  const { setAlert } = alertContext;
  const { addIssue, admin } = authAdminContext;
  const { getProjects, projects, loading } = projectContext;

  useEffect(() => {
    getProjects();
    if (admin && admin.name) {
      setTech(admin.name);
    }
    // eslint-disable-next-line
  }, [authAdminContext, admin]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("open");
  const [tech, setTech] = useState("");
  const [date, setDate] = useState(new Date());

  // const [issue, setIssue] = useState({
  //   projectName: "",
  //   description: "",
  //   priority: "low",
  //   status: "open",
  //   tech: "",
  //   date: new Date()
  // });

  // const { projectName, description, priority, tech, date, status } = issue;

  // const onChange = e => setIssue({ ...issue, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9][\w.\s]+$/i.test(description)) {
      setAlert("Please add valid description", "danger");
    } else {
      const issue = {
        projectName,
        description,
        priority,
        status,
        tech,
        date
      };
      console.log(issue);
      addIssue(issue);
      clearAll();
    }
  };

  const clearAll = () => {
    setProjectName("");
    setDescription("");
    setDate(new Date());
  };

  return (
    <div className="container">
      <div className="border">
        <div className="card-header bg-primary text-light">
          <span className="h4">
            <i className="far fa-plus-square"></i> Issue Summary
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <label>Project Name:</label>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="projectName"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      onBlur={e => setProjectName(e.target.value)}
                      required
                    >
                      <option value="">--Select---</option>
                      {projects !== null && !loading
                        ? projects.map(project => (
                            <option
                              key={project._id}
                              value={project.projectName}
                            >
                              {project.projectName}
                            </option>
                          ))
                        : "no project yet"}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Status:</label>
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
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Priority:</label>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="priority"
                      value={priority}
                      onChange={e => setPriority(e.target.value)}
                      onBlur={e => setPriority(e.target.value)}
                      required
                    >
                      <option value="">--Select---</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Description:</label>
                  </td>
                  <td>
                    <textarea
                      style={{
                        resize: "none"
                      }}
                      type="text"
                      name="description"
                      value={description}
                      className="form-control"
                      placeholder="Text area"
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Reported by:</label>
                  </td>
                  <td>
                    <span className="form-control" readOnly>
                      {tech}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Date today:</label>
                  </td>
                  <td>
                    <span className="form-control" readOnly>
                      <Moment format="MMMM Do YYYY, h:mm:ss a" date={date} />
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      <i className="far fa-plus-square"></i> Report Issue
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

export default AddIssueForm;

// <form onSubmit={onSubmit}>
//   <h2 className="text-primary text-center">Add Issue</h2>
//   <input
//     type="text"
//     placeholder="Issue"
//     name="description"
//     value={description}
//     onChange={onChange}
//   />
//   <h4>Severity</h4>
//   <input
//     type="radio"
//     name="severity"
//     value="low"
//     checked={severity === "low"}
//     onChange={onChange}
//   />
//   Low{" "}
//   <input
//     type="radio"
//     name="severity"
//     value="medium"
//     checked={severity === "medium"}
//     onChange={onChange}
//   />
//   Medium{" "}
//   <input
//     type="radio"
//     name="severity"
//     value="high"
//     checked={severity === "high"}
//     onChange={onChange}
//   />
//   High <br />
//   <hr />
//   <span>
//     <strong>Tech:</strong> <i className="fas fa-user"></i>
//     {assignedTo}
//   </span>
//   <p>
//     Date Issue:
//     <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
//   </p>
//   <div>
//     <input
//       type="submit"
//       value="Add Issue"
//       className="btn btn-primary btn-block"
//     />
//   </div>
// </form>
