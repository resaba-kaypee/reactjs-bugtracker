import React, { useState, useContext, useEffect } from "react";
import IssueContext from "../../../../context/issue/issueContext";
import UnresolvedList from "./UnresolvedList";

const Unresolved = () => {
  const issueContext = useContext(IssueContext);
  const { issues, getIssues, loading } = issueContext;

  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

  const [isDropped, setIsDroppped] = useState(false);
  const handleClick = () => setIsDroppped(!isDropped);
  return (
    <div
      className="card shadow bg-white rounded"
      style={{ marginBottom: "10px" }}
    >
      <div className="card-body">
        <div className="card-header shadow bg-secondary text-light rounded">
          <span className="h4">
            <i className="fas fa-list-alt"></i> Unresolve Issues
          </span>
          <button
            className="btn btn-secondary float-right"
            type="button"
            onClick={handleClick}
          >
            <i
              className={"fas " + (isDropped ? "fa-arrow-up" : "fa-arrow-down")}
            ></i>
          </button>
        </div>
        <div className="card-body">
          {isDropped ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Summary</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {issues !== null && !loading ? (
                  issues.map(issue => (
                    <UnresolvedList key={issue._id} issue={issue} />
                  ))
                ) : (
                  <tr>
                    <td>No issue reported yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Unresolved;
