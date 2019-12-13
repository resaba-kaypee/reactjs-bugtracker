import React, { Fragment, useContext } from "react";
import IssueItem from "./IssueItem";
import IssueContext from "../../context/issue/issueContext";

const Issues = () => {
  const issueContext = useContext(IssueContext);
  const { issues } = issueContext;
  return (
    <Fragment>
      {issues.map(issue => (
        <IssueItem key={issue.id} issue={issue}></IssueItem>
      ))}
    </Fragment>
  );
};

export default Issues;
