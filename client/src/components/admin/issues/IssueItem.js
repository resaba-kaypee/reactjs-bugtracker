/* @todos
 *add a handler if the status is close remove buttons
 *only the user who created the issue will be allowed to edit
 *only admins can closed the issue
 */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";

const IssueItem = ({ issue }) => {
  const authAdminContext = useContext(AuthAdminContext);
  const { setCurrent, clearCurrent, deleteIssue } = authAdminContext;

  const { _id, description, status, severity, assignedTo, date } = issue;

  const onDelete = () => {
    deleteIssue(_id)
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
      <h4>from admin</h4>
      <h5 className="text-info">
        <a
          href="#!"
          data-toggle="modal"
          data-target="#adminEditIssue"
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
            <span className="text-dark">{assignedTo}</span> on{" "}
            <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
            <button className="btn btn-light float-right" onClick={onDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>
            {/* <button className="btn btn-light float-right" onClick={onClose}>
              <i class="fas fa-window-close"></i>
            </button> */}
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
