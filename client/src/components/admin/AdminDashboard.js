import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
// component
import Overview from "./overview/Overview";
import ManageProjects from "./projects/Projects";
import ManageProjectIssues from "./issues/ProjectIssues";
import ManageUsers from "./users/Users";
import ViewUsersLogs from "./logs/Logs";
import Button from "../layout/Button";
import AdminSideNav from "../layout/sidenav/AdminSideNav";
import About from "../pages/About";
import Users from "../../assets/img/users.png";
// modals
import ReportIssueModal from "./issues/modal/ReportIssueModal";
import UpdateIssueModal from "./issues/modal/UpdateIssueModal";
import AddProjectModal from "./projects/modal/AddProjectModal";
import UpdateProjectModal from "./projects/modal/UpdateProjectModal";
import ViewProjectModal from "./projects/modal/ViewProjectModal";
import RegisterUserModal from "./users/modal/RegisterUserModal"
// state | context
// import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import AuthContext from "../../context/auth/authContext";

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadAdmin();
    // eslint-disable-next-line
  }, []);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={"d-flex " + (isToggled ? "toggled" : "")} id="wrapper">
      <nav className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading text-center">
          <img
            id="profile-img"
            className="profile-img-card"
            src={Users}
            alt="img"
          />
          Hello
        </div>
        <div className="list-group list-group-flush">
          <AdminSideNav />
        </div>
      </nav>

      <div id="page-content-wrapper">
        <nav className="navbar navbar-light bg-light border-bottom">
          <span
            id="menu-toggle"
            className="navbar-brand"
            onClick={() => setIsToggled(!isToggled)}
          >
            <Button />
          </span>
          <span className="float-right text-primary">
            <i className="fas fa-user-alt"></i> (administrator)
          </span>
        </nav>

        <div className="container-fluid">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
