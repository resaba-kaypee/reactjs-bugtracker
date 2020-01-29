import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";

const UserSideNav = props => {
  const authAdminContext = useContext(AuthAdminContext);
  const { clearIssues } = authAdminContext;

  const onLogout = () => {
    authAdminContext.logout();
    clearIssues();
  };

  return (
    <Fragment>
      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/overview"
      >
        <i className="fas fa-chalkboard"></i> Overview
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/projects"
      >
        <i className="fas fa-puzzle-piece"></i> Projects
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/issues"
      >
        <i className="fas fa-bug"></i> Issues
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/logs"
      >
        <i className="far fa-list-alt"></i> Logs
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/register"
      >
        <i className="far fa-plus-square" /> Add user
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/contacts"
      >
        <i className="far fa-address-book"></i> Contacts
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
        to="/admin/about"
      >
        <i className="fas fa-info-circle"></i> About
      </Link>
    </Fragment>
  );
};

export default UserSideNav;
