/*
add a handler if the status is close remove buttons
*/
import React from "react";
import PropTypes from "prop-types";

const IssueItem = ({ issue }) => {
  const { id, description, status, severity, assignedTo, date } = issue;

  return (
    <div className="card bg-light grid-2">
      <p style={{ fontSize: 12 }}> <strong>Issue Id:</strong> {id}</p>
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
        {status === "close" ? (
          " "
        ) : (
          <span>
            <button className="btn btn-primary btn-sm">Close</button>
            <button className="btn btn-success btn-sm">Edit</button>
            <button className="btn btn-danger btn-sm">Delete</button>
          </span>
        )}
      </div>
      <span style={{ float: "right", fontSize: 12 }}>
        <p>Date issue: {date}</p>
        {status === "close" ? <p>Date closed: {date}</p> : ""}
      </span>
    </div>
  );
};

IssueItem.propTypes = {
  issue: PropTypes.object.isRequired
};

export default IssueItem;
