import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// component
import Overview from "./overview/Overview";
import ManageProjects from "./projects/Projects";
import ManageProjectIssues from "./issues/ProjectIssues";
import ManageUsers from "./users/Users";
import ViewUsersLogs from "./logs/Logs";
import AdminSideNav from "../layout/sidenav/AdminSideNav";
import About from "../pages/About";
// modals
import ReportIssueModal from "./issues/modal/ReportIssueModal";
import UpdateIssueModal from "./issues/modal/UpdateIssueModal";
import AddProjectModal from "./projects/modal/AddProjectModal";
import UpdateProjectModal from "./projects/modal/UpdateProjectModal";
import ViewProjectModal from "./projects/modal/ViewProjectModal";
import RegisterUserModal from "./users/modal/RegisterUserModal";
// state | context
import AuthContext from "../../context/auth/authContext";

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadAdmin();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <nav className="navbar-main">
        <ul className="navbar-nav-custom bg-secondary text-light text-nowrap">
          <li className="logo bg-dark">
            <a href="#" className="nav-link-custom">
              <span className="link-text logo-text">WELCOME</span>
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

          <AdminSideNav />
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
          <Switch>
            <Route path="/admin/overview" component={Overview} />
            <Route path="/admin/projects" component={ManageProjects} />
            <Route path="/admin/issues" component={ManageProjectIssues} />
            <Route path="/admin/users" component={ManageUsers} />
            <Route path="/admin/logs" component={ViewUsersLogs} />
            <Route path="/admin/about" component={About} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
