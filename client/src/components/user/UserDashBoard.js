import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// component
import PrivateRoute from "../routing/PrivateRoute"
import UserSideNav from "../layout/sidenav/UserSideNav";
import Profile from "../pages/Profile";
import Overview from "../overview/Overview";
import ManageIssues from "../issues/ProjectIssues";
import About from "../pages/About";
// modals
import ReportIssueModal from "../issues/modal/ReportIssueModal";
import UpdateIssueModal from "../issues/modal/UpdateIssueModal";
// state| context
import AuthContext from "../../context/auth/authContext";

const UserDashBoard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content">
      <nav className="navbar-main">
        <ul className="navbar-nav-custom text-light text-nowrap">
          <li className="logo">
            <a href="#!" className="nav-link-custom">
              <span className="link-text logo-text">BUGTRACKER</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          <UserSideNav />
        </ul>
      </nav>
      <main>
        <div>
          <ReportIssueModal />
          <UpdateIssueModal />
          <Switch>
            <PrivateRoute path="/user/profile" component={Profile} />
            <PrivateRoute path="/user/overview" component={Overview} />
            <PrivateRoute path="/user/issues" component={ManageIssues} />
            <Route path="/user/about" component={About} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default UserDashBoard;
