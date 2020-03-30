import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import IssueContext from "../../context/issue/issueContext";

const IssueItem = ({ issue }) => {
  const issueContext = useContext(IssueContext);
  const { setCurrent, clearCurrent, deleteIssue } = issueContext;

  const {
    _id,
    projectName,
    description,
    priority,
    tech,
    comments,
    date
  } = issue;

  const [isCollapse, setIsCollapse] = useState(false);

  const onDelete = () => {
    deleteIssue(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(issue);
  };

  const fontWeight = {
    fontWeight: 600
  };

  return (
    <div className="shadow border-info" style={{marginBottom: "32px"}}>
      <div
        className="card-header bg-secondary text-light"
        style={{
          padding: "0.25rem 1.25rem"
        }}
      >
        <span className="h5">
          <i className="fas fa-puzzle-piece"></i> {projectName}
        </span>
      </div>
      <div className="card-body p-0">
        <table className="table table-bordered">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <label style={fontWeight}>Description:</label>
              </td>
              <td>
                <textarea
                  style={{
                    resize: "none"
                  }}
                  type="text"
                  value={description}
                  className="form-control bg-transparent"
                  readOnly
                ></textarea>
              </td>
            </tr>

            <tr>
              <td>
                <label style={fontWeight}>Priority:</label>
              </td>
              <td>
                <span className="form-control bg-transparent">{priority}</span>
              </td>
            </tr>

            <tr>
              <td>
                <label style={fontWeight}>Reported by:</label>
              </td>
              <td>
                <span className="form-control bg-transparent">{tech}</span>
              </td>
            </tr>

            <tr>
              <td>
                <label style={fontWeight}>Date reported:</label>
              </td>
              <td>
                <span className="form-control bg-transparent">
                  <Moment format="MMMM Do YYYY, h:mm:ss a" date={date} />
                </span>
              </td>
            </tr>

            {/* issue comments component */}
            <tr>
        <td colSpan="2" align="center">
          <button
            className="btn btn-block"
            style={fontWeight}
            data-toggle="collapse"
            data-target={"#collapseOne" + _id}
            aria-expanded="true"
            onClick={() => setIsCollapse(!isCollapse)}
          >
            Comments{" "}
            <i
              className={
                "fas " + (!isCollapse ? "fa-caret-down" : "fa-caret-up")
              }
            ></i>
          </button>
        </td>
      </tr>
      <tr>
        <td
          colSpan="2"
          id={"collapseOne" + _id}
          className="collapse"
        >
          <ul
            className="list-group"
            style={{
              maxHeight: "200px",
              overflow: "scroll"
            }}
          >
            {comments !== null && comments.length > 0 ? (
              comments.map(comment => (
                <li className="list-group-item" style={{backgroundColor: "none"}} key={comment._id}>{comment.message} by {comment.tech}</li>
              ))
            ) : (
              <li className="list-group-item">No comments about this issue yet</li>
            )}
          </ul>
        </td>
      </tr>

            <tr>
              <td colSpan="2" align="end">
                <button
                  className="btn btn-outline-primary btn-sm"
                  data-toggle="modal"
                  data-target="#UpdateIssue"
                  onClick={onEdit}
                >
                  <i className="fas fa-edit"></i> Update
                </button>{" "}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={onDelete}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

IssueItem.propTypes = {
  issue: PropTypes.object.isRequired
};

export default IssueItem;
