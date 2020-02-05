import React, { useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";

const IssueItem = ({ issue }) => {
  const authAdminContext = useContext(AuthAdminContext);
  const { setCurrent, clearCurrent, deleteIssue } = authAdminContext;

  const {
    _id,
    projectName,
    description,
    status,
    severity,
    assignedTo,
    date
  } = issue;

  const onDelete = () => {
    deleteIssue(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(issue);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="row">
        <div className="border bg-primary text-light border-info rounded col">
          <i className="fas fa-puzzle-piece"></i> {projectName}
        </div>
      </div>
      <div className="row">
        <div className="border border-info rounded col col-3">
          <strong>ID:</strong> <span className="text-primary">{_id.substring(0,6)}</span>
        </div>
        <div className="border border-info rounded col col-3">
          <strong>Status:</strong>{" "}
          <span className="text-primary">{status}</span>
        </div>
        <div className="border border-info rounded col col-3">
          <strong>Severity:</strong>{" "}
          <span className="text-primary">{severity}</span>
        </div>
        <div className="border border-info rounded col col-3">
          <strong>Tech:</strong>{" "}
          <span className="text-primary">{assignedTo}</span>
        </div>
      </div>
      <div className="row">
        <div className="border border-info rounded col col-10 col-md-8">
          <strong>Date:</strong> <span className="text-primary"><Moment format="MMMM Do YYYY, h:mm:ss a" date={date}/></span>
        </div>
        <button
          className="btn btn-light border border-info rounded col col-1 col-md-2"
          data-toggle="modal"
          data-target="#adminEditIssue"
          onClick={onEdit}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-light border border-info rounded col col-1 col-md-2"
          onClick={onDelete}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <div className="row">
        <div className="border border-info rounded col">
          <span className="h5">Description:</span>
          <p className="text-primary">{description}</p>
        </div>
      </div>
    </div>
  );
};

// <div>
//   <h4>from admin</h4>
//   <h5 className="text-info">
//     <a
//       href="#!"
//       data-toggle="modal"
//       data-target="#adminEditIssue"
//       onClick={onEdit}
//     >
//       {description}
//     </a>
//   </h5>
//   <div>
//     <span className="text-secondary">
//       <span
//         className={
//           "badge " + (status === "open" ? "badge-light" : "badge-dark")
//         }
//       >
//         Status: {capitalize(status)}
//       </span>
//       {" | "}
//       <span>
//         Severity: <span className="text-dark">{capitalize(severity)}</span>
//       </span>
//       <p>
//         <span className="text-dark">ID#: {_id}</span> last updated by{" "}
//         <span className="text-dark">{assignedTo}</span> on{" "}
//         <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
//         <button className="btn btn-light float-right" onClick={onDelete}>
//           <i className="fas fa-trash-alt"></i>
//         </button>
//       </p>
//     </span>
//   </div>
// </div>

IssueItem.propTypes = {
  issue: PropTypes.object.isRequired
};

export default IssueItem;
