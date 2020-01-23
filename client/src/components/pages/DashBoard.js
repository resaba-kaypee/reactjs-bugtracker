import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Issues from "../issues/Issues";
import UserSideNav from "./sidenav/UserSideNav";

import AuthContext from "../../context/auth/authContext";
import AddIssueModal from "../issues/AddIssueModal";
import EditIssueModal from "../issues/EditIssueModal";

const DashBoard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={"d-flex " + (isToggled ? "toggled" : "")} id="wrapper">
      <div className="bg-light" id="sidebar-wrapper">
        <div className="list-group list-group-flush">
          <UserSideNav />
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom bordered">
          <button
            className="btn btn-primary"
            id="menu-toggle"
            onClick={() => setIsToggled(!isToggled)}
          >
            Toggle Menu
          </button>
        </nav>

        <div className="container-fluid">
          <AddIssueModal />
          <EditIssueModal />
          <Switch>
            <Route path="/dashBoard/home" component={Home} />
            <Route path="/dashBoard/issues" component={Issues} />
            <Route path="/dashBoard/about" component={About} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
