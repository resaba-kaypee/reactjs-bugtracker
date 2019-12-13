import React from "react";

const IssueItem = ({ issue }) => {
  const { id, description, status, severity, assignedTo, date } = issue;
  return (
    <div className="card bg-light">
      <p>Issue Id: {id}</p>
      <p>
        <span
          className={
            "badge " + (status === "close" ? "badge-primary" : "badge-danger")
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </p>
      <h4>{description}</h4>
      <p>
        <span className="badge badge-white">
          <i className="fas fa-clock"></i> {severity}
        </span>{" "}
        <span>
          <i className="fas fa-user"></i> {assignedTo}
        </span>
      </p>
      <div>
        <span>
          <button className="btn btn-primary btn-sm">Close</button>
          <button className="btn btn-success btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </span>
        <span style={{ float: "right" }}>Date issue: {date}</span>
      </div>
    </div>
  );
};

export default IssueItem;
