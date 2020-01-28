import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Issues from "../issues/Issues";
import UserSideNav from "./sidenav/UserSideNav";
import Button from "../layout/Button";

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
      <nav className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          Hello{" "}
          {authContext.user && authContext.user.name
            ? authContext.user.name
            : ""}
        </div>
        <div className="list-group list-group-flush">
          <UserSideNav />
        </div>
      </nav>

      <div id="page-content-wrapper">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light border-bottom"
        >
          <div
            id="menu-toggle"
            className="navbar-brand"
            onClick={() => setIsToggled(!isToggled)}
          >
            <Button />
          </div>
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
// <div className={"d-flex " + (isToggled ? "toggled" : "")} id="wrapper">
//   <div className="" id="sidebar-wrapper">
//     <div className="list-group list-group-flush">
//       <UserSideNav />
//     </div>
//   </div>

//   <div id="page-content-wrapper">
//     <nav className="navbar navbar-expand-lg border-bottom">
// <div id="menu-toggle" className="navbar-brand" onClick={() => setIsToggled(!isToggled)}>
//   <Button />
// </div>
//     </nav>

//     <div className="container-fluid">
// <AddIssueModal />
// <EditIssueModal />
// <Switch>
//   <Route path="/dashBoard/home" component={Home} />
//   <Route path="/dashBoard/issues" component={Issues} />
//   <Route path="/dashBoard/about" component={About} />
// </Switch>
//     </div>
//   </div>
// </div>

export default DashBoard;
