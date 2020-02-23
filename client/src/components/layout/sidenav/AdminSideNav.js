import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import AuthContext from "../../../context/auth/authContext";
import ProjectContext from "../../../context/project/projectContext";

const UserSideNav = props => {
  const authAdminContext = useContext(AuthAdminContext);
  const { clearIssues } = authAdminContext;

  const authContext = useContext(AuthContext)

  const projectContext = useContext(ProjectContext);
  const { clearProjects } = projectContext;

  const onLogout = () => {
    authContext.logoutAdmin();
    clearProjects();
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
        <i className="fas fa-puzzle-piece"></i> Manage Projects
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/issues"
      >
        <i className="fas fa-bug"></i> Manage Issues
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/users"
      >
        <i className="fas fa-user-cog" /> Manage Users
      </Link>

      <Link
        className="list-group-item list-group-item-action bg-light"
        to="/admin/logs"
      >
        <i className="far fa-list-alt"></i> View Users Logs
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
