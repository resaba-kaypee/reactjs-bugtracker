import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// component
import Login from "./components/pages/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import NotFound from "./components/pages/NotFound";
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
import Dashboard from "./components/pages/Dashboard";

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
                      <Switch>
                        <Route exact path="/" component={Login} />
                        <PrivateRoute
                          path="/dashboard"
                          component={Dashboard}
                        />
                        <Route component={NotFound} />
                      </Switch>
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
