import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import NotFound from "../pages/404"
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        // @make this better
        !authContext.isAuthenticated && !authContext.loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
