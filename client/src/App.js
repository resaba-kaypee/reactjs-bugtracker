import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// component
// import Navbar from "./components/layout/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashBoard from "./components/user/UserDashBoard";
import Login from "./components/pages/Login";
import PrivateAdminRoute from "./components/routing/PrivateAdminRoute";
import PrivateRoute from "./components/routing/PrivateRoute";
// utils
import setAuthToken from "./utils/setAuthToken";
// css
import "./assets/css/all.css";
import "./App.css";
import "./Navbar.css";
// state
import AuthAdminState from "./context/authAdmin/AuthAdminState";
import ProjectState from "./context/project/ProjectState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import LogState from "./context/log/LogState";
import IssueState from "./context/issue/IssueState";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <React.StrictMode>
      <AuthState>
        <AuthAdminState>
          <ProjectState>
            <LogState>
              <IssueState>
                <AlertState>
                  <Router>
                    <Fragment>
                      {/* <Navbar /> */}
                      <div className="">
                        <Switch>
                          <Route exact path="/" component={Login} />
                          <PrivateRoute
                            path="/admin"
                            component={AdminDashboard}
                          />
                          <PrivateRoute
                            path="/user"
                            component={UserDashBoard}
                          />
                        </Switch>
                      </div>
                    </Fragment>
                  </Router>
                </AlertState>
              </IssueState>
            </LogState>
          </ProjectState>
        </AuthAdminState>
      </AuthState>
    </React.StrictMode>
  );
};

export default App;
