import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IssueContext from "../../../context/issue/issueContext";
import AuthContext from "../../../context/auth/authContext";
import ProjectContext from "../../../context/project/projectContext";

const AdminSideNav = props => {
  const authContext = useContext(AuthContext);
  const { logoutAdmin, user } = authContext;

  const issueContext = useContext(IssueContext);
  const { clearIssues } = issueContext;

  const projectContext = useContext(ProjectContext);
  const { clearProjects } = projectContext;

  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user.role) {
      setRole(user.role);
    }
  }, [user]);

  const onLogout = () => {
    logoutAdmin();
    clearProjects();
    clearIssues();
  };

  return (
    <Fragment>
      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/home/${role}`}
        >
          <i className="fas fa-home"></i>
          <span className="link-text">Home</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/overview/${role}`}
        >
          <i className="fas fa-chalkboard"></i>
          <span className="link-text">Overview</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/manage-projects/${role}`}
        >
          <i className="fas fa-puzzle-piece"></i>
          <span className="link-text">Manage Projects</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/manage-issues/${role}`}
        >
          <i className="fas fa-bug"></i>
          <span className="link-text">Manage Issues</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/manage-users/${role}`}
        >
          <i className="fas fa-user-cog" />
          <span className="link-text">Manage Users</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/view-logs/${role}`}
        >
          <i className="far fa-list-alt"></i>
          <span className="link-text">View Users Log</span>
        </NavLink>
      </li>

      <li className="nav-item-custom">
        <a onClick={onLogout} href="#!" className="nav-link-custom">
          <i className="fas fa-sign-out-alt"></i>
          <span className="link-text"> Logout</span>
        </a>
      </li>

      <li className="nav-item-custom">
        <NavLink
          activeClassName="nav-link-custom-active"
          className="nav-link-custom"
          to={`/dashboard/about/${role}`}
        >
          <i className="fas fa-info-circle"></i>
          <span className="link-text">About</span>
        </NavLink>
      </li>
    </Fragment>
  );
};

export default AdminSideNav;
