import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ProjectIssues from "./issues/ProjectIssues";
// import IssueFilter from "./issues/IssueFilter";
import Users from "../../assets/img/users.png"
import Logs from "./logs/Logs";
import Register from "../auth/Register"
import Contacts from "./contacts/Contacts";
import Projects from "./projects/Projects";
import AdminIssueModal from "./issues/AdminIssueModal";
import AdminEditIssueModal from "./issues/AdminEditIssueModal";
import Button from "../layout/Button";
import About from "../pages/About";
import AdminSideNav from "../pages/sidenav/AdminSideNav";
import Overview from "./overview/Overview";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";


const AdminHome = () => {
  const authAdminContext = useContext(AuthAdminContext);

  useEffect(() => {
    authAdminContext.loadAdmin();
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
        Hello {authAdminContext.admin && authAdminContext.admin.name}
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
          <AdminIssueModal />
          <AdminEditIssueModal />
          <Switch>
            <Route path="/admin/overview" component={Overview} />
            <Route path="/admin/projects" component={Projects} />
            <Route path="/admin/issues" component={ProjectIssues} />
            <Route path="/admin/logs" component={Logs} />
            <Route path="/admin/register" component={Register} />
            <Route path="/admin/contacts" component={Contacts} />
            <Route path="/admin/about" component={About} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
