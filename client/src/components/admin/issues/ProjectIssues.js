import React, { useContext, useEffect } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProjectIssueItem from "./ProjectIssueItem";
import IssueFilter from "./IssueFilter";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import Spinner from "../../layout/Spinner";

const ProjectIssues = () => {
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
    <div
      className="card border-primary"
      style={{ marginBottom: "10px", marginTop: "20px" }}
    >
      <div className="card-header bg-primary text-light">
        <span className="h4">
          <i className="fas fa-columns"></i> Viewing Project Issues
        </span>
      </div>
      <div className="card-body">
        <div className="card-header">
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="modal"
            data-target="#addIssueAdmin"
          >
            Report Issue
          </button>
          <span className="float-right">
            <IssueFilter />
          </span>
        </div>
        <div className="card-body">
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

// <Fragment>
//   {issues !== null && !loading ? (
//     <TransitionGroup>
//       {filtered !== null
//         ? filtered.map(issue => (
//             <CSSTransition classNames="item" key={issue._id} timeout={500}>
//               <ul className="list-group">
//                 <li className="list-group-item">
//                   <IssueItem issue={issue}></IssueItem>
//                 </li>
//               </ul>
//             </CSSTransition>
//           ))
//         : issues.map(issue => (
//             <CSSTransition classNames="item" key={issue._id} timeout={500}>
//               <ul className="list-group">
//                 <li className="list-group-item">
//                   <IssueItem issue={issue}></IssueItem>
//                 </li>
//               </ul>
//             </CSSTransition>
//           ))}
//     </TransitionGroup>
//   ) : (
//     <Spinner />
//   )}
// </Fragment>
export default ProjectIssues;
