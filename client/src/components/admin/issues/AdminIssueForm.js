import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../../context/alert/alertContext";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import Moment from "react-moment";

const AddIssueForm = () => {
  const alertContext = useContext(AlertContext);
  const authAdminContext = useContext(AuthAdminContext);
  const { setAlert } = alertContext;
  const { addIssue, admin } = authAdminContext;

  useEffect(() => {
    if (admin && admin.name) {
      setIssue({
        description: "",
        severity: "low",
        status: "open",
        assignedTo: admin.name,
        date: new Date()
      });
    }
  }, [authAdminContext, admin]);

  const [issue, setIssue] = useState({
    description: "",
    severity: "low", 
    status: "open",
    assignedTo: "",
    date: new Date()
  });

  const { description, severity, assignedTo, date } = issue;

  const onChange = e => setIssue({ ...issue, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9][\w.\s]+$/i.test(description)) {
      setAlert("Please add valid description", "danger");
    } else {
      addIssue(issue);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-center">Add Issue</h2>
      <input
        type="text"
        placeholder="Issue"
        name="description"
        value={description}
        onChange={onChange}
      />
      <h4>Severity</h4>
      <input
        type="radio"
        name="severity"
        value="low"
        checked={severity === "low"}
        onChange={onChange}
      />
      Low{" "}
      <input
        type="radio"
        name="severity"
        value="medium"
        checked={severity === "medium"}
        onChange={onChange}
      />
      Medium{" "}
      <input
        type="radio"
        name="severity"
        value="high"
        checked={severity === "high"}
        onChange={onChange}
      />
      High <br />
      <hr />
      <span>
        <strong>Tech:</strong> <i className="fas fa-user"></i>
        {assignedTo}
      </span>
      <p>
        Date Issue:
        <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
      </p>
      <div>
        <input
          type="submit"
          value="Add Issue"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default AddIssueForm;
