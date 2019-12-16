/*
get the assigned to: from the user that is log in
*/

import React, { useState } from "react";

const IssueForm = () => {
  const [issue, setIssue] = useState({
    description: "",
    severity: "low",
    status: "open",
    assignedTo: "Jhon",
    date: "12-12-12-"
  });

  const { description, severity, assignedTo } = issue;

  const onChange = e =>
    setIssue({ ...issue, [e.target.name]: e.target.value });

  return (
    <form>
      <h2 className="text-primary">Add Issue</h2>
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
      <span>
       <strong>Assigned to:</strong>{" "}
        <i className="fas fa-user"></i>
         {assignedTo}
      </span>
      <div>
        <input type="submit" value="Add Issue" className="btn btn-primary btn-block"/>
      </div>
    </form>
  );
};

export default IssueForm;
