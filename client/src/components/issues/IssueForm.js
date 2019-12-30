/*
get the assigned to: from the user that is log in
*/

import React, { useState, useContext, useEffect } from "react";
import IssueContext from "../../context/issue/issueContext";
import AuthContext from "../../context/auth/authContext";

const IssueForm = () => {
  const issueContext = useContext(IssueContext);
  const { addIssue, current, clearCurrent, updateIssue } = issueContext;
  const authContext = useContext(AuthContext);
  const { user} = authContext;
  
  const [issue, setIssue] = useState({
    description: "",
    severity: "",
    status: "open",
    assignedTo: "",
    date: addDate()
  }); 

  const { description, severity, assignedTo, date } = issue;

  
  useEffect(() => {
    if (current !== null) {
      setIssue(current);
    } else {
      // set it back to default state
      if(user && user.name){
        setIssue({
          description: "",
          severity: "",
          assignedTo: user.name,
          status: "open",
          date: addDate()
        });  
      }
    }
  }, [issueContext, current, authContext, user]);


  const onChange = e => setIssue({ ...issue, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addIssue(issue);
    } else {
      updateIssue(issue);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-center">
        {current ? "Edit Issue" : "Add Issue"}
      </h2>
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
        <strong>Assigned to:</strong> <i className="fas fa-user"></i>
        {assignedTo}
      </span>
      <p>Date Issue: {date}</p>
      <div>
        <input
          type="submit"
          value={current ? "Update Issue" : "Add Issue"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

const addDate = () => {
  let date = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dd = date.getDate();
  let mm = date.getMonth();
  let yy = date.getFullYear();
  let d = days[date.getDay()];
  let h = date.getHours();
  let m = date.getMinutes();
  let am_pm = "AM";

  if (h === 0) {
    h = 12;
  }

  if (h > 12) {
    h -= 12;
    am_pm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  return `${d}-${h}:${m}${am_pm} : ${dd}/${mm}/${yy}`;
};

export default IssueForm;
