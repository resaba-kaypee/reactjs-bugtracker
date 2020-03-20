import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import IssueContext from "../../../context/issue/issueContext";
import AuthContext from "../../../context/auth/authContext";
import ProjectContext from "../../../context/project/projectContext";

const UserSideNav = props => {
  const authContext = useContext(AuthContext);
  const { logoutAdmin } = authContext;

  const issueContext = useContext(IssueContext);
  const { clearIssues } = issueContext;

  const projectContext = useContext(ProjectContext);
  const { clearProjects } = projectContext;

  const onLogout = () => {
    logoutAdmin();
    clearProjects();
    clearIssues();
  };

  return (
    <Fragment>
      <li className="nav-item-custom">
        <span className="nav-link-custom">
          <i className="fas fa-user"></i>
          <span className="link-text">Sam Smith (admin)</span>
        </span>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/overview">
          <i className="fas fa-chalkboard"></i>
          <span className="link-text">Overview</span>
        </Link>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/projects">
          <i className="fas fa-puzzle-piece"></i>
          <span className="link-text">Manage Projects</span>
        </Link>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/issues">
          <i className="fas fa-bug"></i>
          <span className="link-text">Manage Issues</span>
        </Link>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/users">
          <i className="fas fa-user-cog" />
          <span className="link-text">Manage Users</span>
        </Link>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/logs">
          <i className="far fa-list-alt"></i>
          <span className="link-text">View Users Log</span>
        </Link>
      </li>

      <li className="nav-item-custom">
        <a onClick={onLogout} href="#!" className="nav-link-custom">
          <i className="fas fa-sign-out-alt"></i>
          <span className="link-text"> Logout</span>
        </a>
      </li>

      <li className="nav-item-custom">
        <Link className="nav-link-custom" to="/admin/about">
          <i className="fas fa-info-circle"></i>
          <span className="link-text">About</span>
        </Link>
      </li>
    </Fragment>
  );
};

export default UserSideNav;
