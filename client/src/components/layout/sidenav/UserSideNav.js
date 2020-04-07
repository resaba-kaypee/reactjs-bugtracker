import React, { Fragment, useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import IssueContext from "../../../context/issue/issueContext";
import AuthContext from "../../../context/auth/authContext";

const UserSideNav = props => {
  const authContext = useContext(AuthContext);
  const { logoutUser, user } = authContext;

  const issueContext = useContext(IssueContext);
  const { clearIssues } = issueContext;

  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user.role) {
      setRole(user.role);
    }
  }, [user]);

  const onLogout = () => {
    logoutUser();
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
          to={`/dashboard/manage-issues/${role}`}
        >
          <i className="fas fa-bug"></i>
          <span className="link-text">Manage Issues</span>
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

export default UserSideNav;
