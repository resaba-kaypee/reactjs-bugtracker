import React, { useContext } from "react";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import { Route, Redirect } from "react-router-dom";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const authAdminContext = useContext(AuthAdminContext);
  return (
    <Route
      {...rest}
      render={props =>
        // @make this better
        !authAdminContext.isAuthenticated && !authAdminContext.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
