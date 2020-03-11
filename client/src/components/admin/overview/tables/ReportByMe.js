import React, { useState, useContext, useEffect } from "react";
import IssueContext from "../../../../context/issue/issueContext";
import ReportByMeList from "./ReportByMeList";
const ReportByMe = () => {
  const [isDropped, setIsDroppped] = useState(false);
  const handleClick = () => setIsDroppped(!isDropped);

  const issueContext = useContext(IssueContext);
  const { usersIssue, loading, getMyIssues } = issueContext;

  useEffect(() => {
    getMyIssues();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-header bg-primary text-light">
        <span className="h4">
          <i className="fas fa-list-alt"></i> Report by me
        </span>
        <button
          className="btn btn-primary float-right"
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
              {usersIssue !== null && !loading ? (
                usersIssue.map(issue => (
                  <ReportByMeList key={issue._id} issue={issue} />
                ))
              ) : (
                <tr>
                  <td>No issue reported by you</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReportByMe;
