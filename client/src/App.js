import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AdminHome from "./components/admin/AdminHome";
import DashBoard from "./components/pages/DashBoard";
import Login from "./components/auth/Login";
import IssueState from "./context/issue/IssueState";
import LogState from "./context/log/LogState";
import AuthAdminState from "./context/authAdmin/AuthAdminState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateAdminRoute from "./components/routing/PrivateAdminRoute";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./assets/css/all.css";
import "./App.css";
import AdminIssueModal from "./components/admin/issues/AdminIssueModal";
import AdminEditIssueModal from "./components/admin/issues/AdminEditIssueModal";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <React.StrictMode>
      <AuthAdminState>
        <AuthState>
          <LogState>
            <IssueState>
              <AlertState>
                <Router>
                  <Fragment>
                    <Navbar />
                    <div className="">
                      <AdminIssueModal />
                      <AdminEditIssueModal />
                      <Switch>
                        <Route exact path="/" component={Login} />
                        <PrivateAdminRoute path="/admin" component={AdminHome} />
                        <PrivateRoute path="/dashBoard" component={DashBoard} />
                      </Switch>
                    </div>
                  </Fragment>
                </Router>
              </AlertState>
            </IssueState>
          </LogState>
        </AuthState>
      </AuthAdminState>
    </React.StrictMode>
  );
};

export default App;
