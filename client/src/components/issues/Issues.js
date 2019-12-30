import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import IssueItem from "./IssueItem";
import IssueContext from "../../context/issue/issueContext";
import Spinner from "../layout/Spinner";

const Issues = () => {
  const issueContext = useContext(IssueContext);
  const { issues, filtered, getIssues, loading } = issueContext;

  useEffect(() => {
    getIssues();
    // eslint-disable-next-line
  }, []);

  if (issues !== null && issues.length === 0 && !loading) {
    return <h4>No issues...</h4>;
  }

  return (
    <Fragment>
      {issues !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(issue => (
                <CSSTransition classNames="item" key={issue._id} timeout={500}>
                  <IssueItem issue={issue}></IssueItem>
                </CSSTransition>
              ))
            : issues.map(issue => (
                <CSSTransition classNames="item" key={issue._id} timeout={500}>
                  <IssueItem issue={issue}></IssueItem>
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Issues;
