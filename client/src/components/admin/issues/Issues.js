import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import IssueItem from "./IssueItem";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext"
import Spinner from "../../layout/Spinner";

const Issues = () => {
  const authAdminContext = useContext(AuthAdminContext);
  const { issues, filtered, getIssues, loading } = authAdminContext;

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
                  <ul className="list-group">
                    <li className="list-group-item">
                      <IssueItem issue={issue}></IssueItem>
                    </li>
                  </ul>
                </CSSTransition>
              ))
            : issues.map(issue => (
                <CSSTransition classNames="item" key={issue._id} timeout={500}>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <IssueItem issue={issue}></IssueItem>
                    </li>
                  </ul>
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
