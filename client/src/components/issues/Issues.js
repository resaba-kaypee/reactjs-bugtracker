import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import IssueItem from "./IssueItem";
import IssueFilter from "./IssueFilter";
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
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#!">
          <i className="fas fa-columns" /> Viewing Issues
        </a>

        <div className="float-right">
          <form className="form-inline">
            <IssueFilter />
          </form>
          <a href="#!" data-toggle="modal" data-target="#addIssue">
            <i className="fas fa-plus-square" /> Report Issue
          </a>
        </div>
      </nav>
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
// <div className="card">
//   <div className="card-header">
//     <span className="navbar-brand" href="#!">
//       <i className="fas fa-columns" /> Viewing Issues
//     </span>
//     <span>
//     <IssueFilter />
//     </span>
//     <div>
//       <a href="#!">
//         <i className="fas fa-plus-square" /> Report Issue
//       </a>
//     </div>
//   </div>
//   <div className="card-body-table">
//     {issues !== null && !loading ? (
//       <table className="table table-hover">
//         <thead className="bg-primary text-light">
//           <tr>
//             <th scope="col">Id</th>
//             <th scope="col">Tech</th>
//             <th scope="col">Resolved</th>
//             <th scope="col">Severity</th>
//             <th scope="col">Updated</th>
//             <th scope="col">Summary</th>
//             <th scope="col"></th>
//             <th scope="col"></th>
//           </tr>
//         </thead>
//         {filtered !== null ? (
//           <tbody>
//             {filtered.map(issue => (
//               <tr key={issue._id}>
//                 <IssueItem issue={issue} />
//               </tr>
//             ))}
//           </tbody>
//         ) : (
//           <tbody>
//             {issues.map(issue => (
//               <tr key={issue._id}>
//                 <IssueItem issue={issue} />
//               </tr>
//             ))}
//           </tbody>
//         )}
//       </table>
//     ) : (
//       <Spinner />
//     )}
//   </div>
// </div>

export default Issues;
