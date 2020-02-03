import React, { useState, useContext, useEffect, Fragment } from "react";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import AlertContext from "../../../../context/alert/alertContext";

const EditIssueForm = () => {
  const alertContext = useContext(AlertContext);
  const authAdminContext = useContext(AuthAdminContext);
  const { setAlert } = alertContext;
  const { current, updateIssue, clearCurrent, admin } = authAdminContext;

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

    if (admin && admin.name) {
      setAssignedTo(admin.name);
    }
  }, [admin, current]);

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
      {authAdminContext.isAuthenticated && !authAdminContext.loading ? (
        <Fragment>
          <h4>Status</h4>
          <input
            type="radio"
            name="status"
            value="open"
            checked={status === "open"}
            onChange={e => setStatus(e.target.value)}
          />{" "}
          Open{" "}
          <input
            type="radio"
            name="status"
            value="closed"
            checked={status === "closed"}
            onChange={e => setStatus(e.target.value)}
          />{" "}
          Close
        </Fragment>
      ) : (
        ""
      )}
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
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >Save changes</button>
      </div>
    </form>
  );
};

export default EditIssueForm;
