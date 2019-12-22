import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(issue => (
              <CSSTransition classNames="item" key={issue.id} timeout={500}>
                <IssueItem issue={issue}></IssueItem>
              </CSSTransition>
            ))
          : issues.map(issue => (
              <CSSTransition classNames="item" key={issue.id} timeout={500}>
                <IssueItem issue={issue}></IssueItem>
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Issues;
