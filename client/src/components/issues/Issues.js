import React, { Fragment, useContext } from "react";
import IssueItem from "./IssueItem";
import IssueContext from "../../context/issue/issueContext";

const Issues = () => {
  const issueContext = useContext(IssueContext);
  const { issues, filtered } = issueContext;
  if (issues.length === 0) {
    return <h4>No issues...</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(issue => (
            <IssueItem key={issue.id} issue={issue}></IssueItem>
          ))
        : issues.map(issue => (
            <IssueItem key={issue.id} issue={issue}></IssueItem>
          ))}
    </Fragment>
  );
};

export default Issues;
