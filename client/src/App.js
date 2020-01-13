import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Nav from "./components/layout/SideNav";
import AdminHome from "./components/admin/AdminHome";
import DashBoard from "./components/pages/DashBoard";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import IssueState from "./context/issue/IssueState";
import AuthAdminState from "./context/authAdmin/AuthAdminState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateAdminRoute from "./components/routing/PrivateAdminRoute";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./assets/css/all.css";
import "./assets/css/bootstrap.min.css";
import "./App.css";
import AddIssueModal from "./components/issues/AddIssueModal";
import EditIssueModal from "./components/issues/EditIssueModal";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const onHideNav = () => {
    setShowNav(!showNav);
  };

  return (
    <AuthAdminState>
    <AuthState>
      <IssueState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar onHideNav={onHideNav} />
              <Nav showNav={showNav} onHideNav={onHideNav} />
              <div className="container">
                <AddIssueModal />
                <EditIssueModal />
                <Switch>
                  <PrivateAdminRoute exact path="/admin" component={AdminHome} />
                  <PrivateAdminRoute exact path="/admin/register" component={Register} />
                  <PrivateRoute exact path="/" component={DashBoard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </IssueState>
    </AuthState>
    </AuthAdminState>
  );
};

export default App;
