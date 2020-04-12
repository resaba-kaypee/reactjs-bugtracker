import React, { useContext, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
// component
import ProjectIssueItem from "./ProjectIssueItem";
import IssueFilter from "./IssueFilter";
import Spinner from "../layout/Spinner";
// state | context
import IssueContext from "./../../context/issue/issueContext";
import AuthContext from "../../context/auth/authContext";

const ProjectIssues = () => {
  const issueContext = useContext(IssueContext);
  const { issues, filtered, getIssues, loading } = issueContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

  const { role } = useParams();

  if (user && user.role !== role) {
    return <Redirect to={`/dashboard/home/${user.role}`} />;
  }

  return (
    <div
      className="card card-custom shadow bg-white rounded"
    >
      <div className="card-header bg-dark text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-bug"></i> Manage Project Issues
        </span>
      </div>
      <div className="card-body">
        <nav className="navbar flex-space-between shadow bg-white rounded">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="modal"
            data-target="#addIssueAdmin"
          >
            <i className="fas fa-plus"></i> Report Issue
          </button>
          <IssueFilter />
        </nav>
        <div className="card-body card-body-list">
          {/* issue item */}
          {issues !== null && !loading ? (
            filtered !== null ? (
              filtered.map(issue => (
                <ProjectIssueItem key={issue._id} issue={issue} />
              ))
            ) : Object.keys(issues).length > 0 ? (
              issues.map(
                issue =>
                  issue.status === "open" && (
                    <ProjectIssueItem key={issue._id} issue={issue} />
                  )
              )
            ) : (
              <h3>No issues found, Let's search one!</h3>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectIssues;
