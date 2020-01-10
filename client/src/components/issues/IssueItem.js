/* @todos
 *add a handler if the status is close remove buttons
 *only the user who created the issue will be allowed to edit
 *only admins can closed the issue
 */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import IssueContext from "../../context/issue/issueContext";

const IssueItem = ({ issue }) => {
  const issueContext = useContext(IssueContext);
  const { deleteIssue, setCurrent, clearCurrent } = issueContext;

  const { _id, description, status, severity, assignedTo, date } = issue;

  const onDelete = e => {
    deleteIssue(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(issue);
  };

  const capitalize = val => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  return (
    <div>
      <h5 className="text-info">
        <a
          href="#!"
          data-toggle="modal"
          data-target="#editIssue"
          onClick={onEdit}
        >
          {description}
        </a>
      </h5>
      <div>
        <span className="text-secondary">
          <span
            className={
              "badge " + (status === "open" ? "badge-light" : "badge-dark")
            }
          >
            Status: {capitalize(status)}
          </span>
          {" | "}
          <span>
            Severity: <span className="text-dark">{capitalize(severity)}</span>
          </span>
          <p>
            <span className="text-dark">ID#: {_id}</span> last updated by{" "}
            <span className="text-dark">{assignedTo}</span> on {date}
            <button className="btn btn-light float-right" onClick={onDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </p>
        </span>
      </div>
    </div>
  );
};

IssueItem.propTypes = {
  issue: PropTypes.object.isRequired
};

export default IssueItem;
