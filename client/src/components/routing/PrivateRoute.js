import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateUserRoute = ({ component: Component, role, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        // @make this better
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateUserRoute;
