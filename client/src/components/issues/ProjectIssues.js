import React, { useContext, useEffect } from "react";
import ProjectIssueItem from "./ProjectIssueItem";
import IssueFilter from "./IssueFilter";
import IssueContext from "./../../context/issue/issueContext";
import Spinner from "../layout/Spinner";

const ProjectIssues = () => {
  const issueContext = useContext(IssueContext);
  const { issues, filtered, getIssues, loading } = issueContext;

  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

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
            ) : (
              issues.map(
                issue =>
                  issue.status === "open" && (
                    <ProjectIssueItem key={issue._id} issue={issue} />
                  )
              )
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
