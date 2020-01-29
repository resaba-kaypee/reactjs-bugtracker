import React, { useState, useContext, useEffect } from "react";
import IssueContext from "../../../context/issue/issueContext";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";

const EditIssueForm = () => {
  const issueContext = useContext(IssueContext);
  const { current, clearCurrent, updateIssue } = issueContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [status, setStatus] = useState("open");
  const [assignedTo, setAssignedTo] = useState();

  useEffect(() => {
    if (current !== null) {
      setDescription(current.description);
      setSeverity(current.severity);
      setStatus(current.status);
    }

    if (user && user.name) {
      setAssignedTo(user.name);
    }
  }, [issueContext, current, authContext, user]);

  const onSubmit = e => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9][\w.\s]+$/i.test(description)) {
      setAlert("Please add valid description", "danger");
    } else {
      const updated = {
        id: current._id,
        description,
        severity,
        status,
        assignedTo,
        date: new Date()
      };
      updateIssue(updated);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-center">Edit Issue</h2>
      <input
        type="text"
        placeholder="Issue"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <hr />
      <h4>Severity</h4>
      <input
        type="radio"
        name="severity"
        value="low"
        checked={severity === "low"}
        onChange={e => setSeverity(e.target.value)}
      />
      Low{" "}
      <input
        type="radio"
        name="severity"
        value="medium"
        checked={severity === "medium"}
        onChange={e => setSeverity(e.target.value)}
      />
      Medium{" "}
      <input
        type="radio"
        name="severity"
        value="high"
        checked={severity === "high"}
        onChange={e => setSeverity(e.target.value)}
      />
      High <br />
      <hr />
      <div>
        <input
          type="submit"
          value="Save changes"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default EditIssueForm;
