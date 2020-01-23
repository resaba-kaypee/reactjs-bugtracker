import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
import IssueContext from "../../../context/issue/issueContext";

const UserSideNav = (props) => {
  const authContext = useContext(AuthContext);
  const issueContext = useContext(IssueContext);
  const { clearIssues } = issueContext;

  const onLogout = () => {
    authContext.logout();
    clearIssues();
  };

  return (
    <Fragment>
      <ul className="list-group bg-light rounded-right">
        <li className="list-group-item">
          <div>
            <h1>Hello</h1>
          </div>
        </li>
        <li className="list-group-item">
          <i className="fas fa-home"></i> <Link to="/dashBoard/home">Home</Link>
        </li>
        <li className="list-group-item">
          <i className="fas fa-bug"></i> <Link to="/dashBoard/issues">Issues</Link>
        </li>
        <li className="list-group-item">
          <i className="fas fa-address-book"></i> <Link to="/dashBoard/contacts">Contacts</Link>
        </li>
        <li className="list-group-item">
          <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm"> Logout</span>
          </a>
        </li>
        <li className="list-group-item">
          <i className="fas fa-info-circle"></i> <Link to="/dashBoard/about">About</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default UserSideNav;
