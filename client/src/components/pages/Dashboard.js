import React, { useContext, useEffect, useState, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// component
import AdminSideNav from "../layout/sidenav/AdminSideNav";
import UserSideNav from "../layout/sidenav/UserSideNav";
import Home from "../pages/Home";
import Overview from "../overview/Overview";
import ManageProjects from "../admin/projects/Projects";
import ManageProjectIssues from "../issues/ProjectIssues";
import ManageUsers from "../admin/users/Users";
import ViewUsersLogs from "../admin/logs/Logs";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
// import PrivateRoute from "../routing/PrivateRoute";
// modals
import ReportIssueModal from "../issues/modal/ReportIssueModal";
import UpdateIssueModal from "../issues/modal/UpdateIssueModal";
import AddProjectModal from "../admin/projects/modal/AddProjectModal";
import UpdateProjectModal from "../admin/projects/modal/UpdateProjectModal";
import ViewProjectModal from "../admin/projects/modal/ViewProjectModal";
import RegisterUserModal from "../admin/users/modal/RegisterUserModal";
// state | context
import AuthContext from "../../context/auth/authContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { loadAdmin, loadUser, user } = authContext;

  useEffect(() => {
    loadAdmin();
    loadUser();

    // eslint-disable-next-line
  }, []);

  const [colored, setColored] = useState(false);
  const toggle = () => setColored(!colored);

  return (
    <div className="content">
      <nav className="navbar-main">
        <ul
          className={`navbar-nav-custom text-light text-nowrap ${
            colored ? "fadeIn" : "fadeOut"
          }`}
          onMouseEnter={toggle}
          onMouseLeave={toggle}
        >
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
          {user && user.role === "admin" ? (
            <AdminSideNav />
          ) : user && user.role === "user" ? (
            <UserSideNav />
          ) : null}
        </ul>
      </nav>
      <main>
        <div>
          <ReportIssueModal />
          <UpdateIssueModal />
          <AddProjectModal />
          <UpdateProjectModal />
          <ViewProjectModal />
          <RegisterUserModal />

          <Fragment>
            {user && user.role === "admin" ? (
              <Switch>
                <Route path="/dashboard/home/:role" component={Home} />
                <Route path="/dashboard/overview/:role" component={Overview} />
                <Route
                  path="/dashboard/manage-projects/:role"
                  component={ManageProjects}
                />
                <Route
                  path="/dashboard/manage-issues/:role"
                  component={ManageProjectIssues}
                />
                <Route
                  path="/dashboard/manage-users/:role"
                  component={ManageUsers}
                />
                <Route
                  path="/dashboard/view-logs/:role"
                  component={ViewUsersLogs}
                />
                <Route path="/dashboard/about/:role" component={About} />
                <Route component={NotFound} />
              </Switch>
            ) : user && user.role === "user" ? (
              <Switch>
                <Route path="/dashboard/home/:role" component={Home} />
                <Route path="/dashboard/overview/:role" component={Overview} />
                <Route
                  path="/dashboard/manage-issues/:role"
                  component={ManageProjectIssues}
                />
                <Route path="/dashboard/about/:role" component={About} />
                <Route component={NotFound} />
              </Switch>
            ) : null}
          </Fragment>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
