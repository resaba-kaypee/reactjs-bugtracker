import React, { useState, useContext, useEffect } from "react";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import AlertContext from "../../../../context/alert/alertContext";

const UpdateIssueForm = () => {
  const alertContext = useContext(AlertContext);
  const authAdminContext = useContext(AuthAdminContext);
  const { setAlert } = alertContext;
  const {
    current,
    updateIssue,
    addComment,
    admin
  } = authAdminContext;

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("open");
  const [tech, setTech] = useState();
  const [message, setMessage] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    if (current !== null) {
      setProjectName(current.projectName);
      setDescription(current.description);
      setPriority(current.priority);
      setStatus(current.status);
    }

    if (admin && admin.name) {
      setTech(admin.name);
    }
  }, [admin, current]);

  const onSubmit = e => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9][\w.\s]+$/i.test(description)) {
      setAlert("Please enter valid description", "danger");
    } else if (!isCommenting) {
      const updated = {
        id: current._id,
        description,
        priority,
        status,
        tech,
        date: new Date()
      };
      updateIssue(updated);
      console.log(updated);
    }

    if (!/^[a-zA-Z0-9][\w.\s]+$/i.test(message) && isCommenting) {
      setAlert("Please enter valid comment", "danger");
    } else if(isCommenting) {
      const comment = {
        id: current._id,
        tech,
        message
      };
      addComment(comment);
    }

    clearAll();
  };

  const clearAll = () => {
    setMessage("");
    setDescription("")
  };

  return (
    <div>
      <div className="border">
        <div className="card-header bg-primary text-light">
          <span className="h4">
            <i className="fas fa-bug"></i> Update {projectName}
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <table className="table table-bordered">
              <tbody>
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
                      placeholder="Description..."
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
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                      onClick={() => setIsCommenting(false)}
                    >
                      <i className="fas fa-plus"></i> Report Issue
                    </button>
                  </td>
                </tr>
              </tbody>

              {/* add comment */}
              <tbody>
                <tr>
                  <td>
                    <textarea
                      style={{
                        resize: "none"
                      }}
                      type="text"
                      name="message"
                      value={message}
                      className="form-control"
                      placeholder="Add comment..."
                      onChange={e => setMessage(e.target.value)}
                    ></textarea>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                      onClick={() => setIsCommenting(true)}
                    >
                      <i className="fas fa-plus"></i> Add Comment
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

export default UpdateIssueForm;
