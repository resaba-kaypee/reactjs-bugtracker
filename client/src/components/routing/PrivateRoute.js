import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const authAdminContext = useContext(AuthAdminContext);
  return (
    <Route
      {...rest}
      render={props =>
        // @make this better
        !authContext.isAuthenticated && !authContext.loading ? (
          <Redirect to="/login" />
        ) : !authAdminContext.isAuthenticated && !authAdminContext.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
