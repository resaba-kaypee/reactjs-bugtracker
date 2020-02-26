import React, { useContext, useEffect } from "react";
import ProjectIssueItem from "./ProjectIssueItem";
import IssueFilter from "./IssueFilter";
import IssueContext from "../../../context/issue/issueContext";
import Spinner from "../../layout/Spinner";

const ProjectIssues = () => {
  const issueContext = useContext(IssueContext);
  const { issues, filtered, getIssues, loading } = issueContext;

  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="card shadow bg-white rounded"
      style={{ marginBottom: "10px", marginTop: "20px" }}
    >
      <div className="card-header bg-primary text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-bug"></i> Viewing Project Issues
        </span>
      </div>
      <div className="card-body">
        <div className="card-header shadow bg-white rounded">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="modal"
            data-target="#addIssueAdmin"
          >
            <i className="fas fa-plus"></i> Report Issue
          </button>
          <IssueFilter />
        </div>
        <div
          className="card-body"
          style={{
            maxHeight: "600px",
            overflowY: "scroll"
          }}
        >
          {/* issue item */}
          {issues !== null && !loading ? (
            filtered !== null ? (
              filtered.map(issue => (
                <ProjectIssueItem key={issue._id} issue={issue} />
              ))
            ) : (
              issues.map(issue => (
                <ProjectIssueItem key={issue._id} issue={issue} />
              ))
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
