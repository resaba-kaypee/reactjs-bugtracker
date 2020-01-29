import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
import IssueContext from "../../../context/issue/issueContext";

const UserSideNav = props => {
  const authContext = useContext(AuthContext);
  const issueContext = useContext(IssueContext);
  const { clearIssues } = issueContext;

  const onLogout = () => {
    authContext.logout();
    clearIssues();
  };

  return (
    <Fragment>
      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/dashBoard/home"
      >
        <i className="fas fa-home"></i> Home
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/dashBoard/issues"
      >
        <i className="fas fa-bug"></i> Issues
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/dashBoard/contacts"
      >
        <i className="fas fa-address-book"></i> Contacts
      </Link>

      <a
        onClick={onLogout}
        href="#!"
        className="list-group-item list-group-item-action bg-light"
      >
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm"> Logout</span>
      </a>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/dashBoard/about"
      >
        <i className="fas fa-info-circle"></i> About
      </Link>
    </Fragment>
  );
};

export default UserSideNav;
