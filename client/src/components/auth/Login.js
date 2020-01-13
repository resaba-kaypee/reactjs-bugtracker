import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import Alerts from "../layout/Alerts";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const authAdminContext = useContext(AuthAdminContext);

  useEffect(() => {
    // authenticate admin
    if (authAdminContext.isAuthenticated) {
      props.history.push("/admin");
    }

    if (authAdminContext.error === "Invalid Credentials") {
      setAlert(authAdminContext.error, "danger");
      authAdminContext.clearErrors();
    }

    // authenticate user
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }

    if (authContext.error === "Invalid Credentials") {
      setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }

    // eslint-disable-next-line
  }, [
    authContext.error,
    authContext.isAuthenticated,
    authAdminContext.error,
    authAdminContext.isAuthenticated,
    props.history
  ]);

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const { email, password } = values;

  const onChange = e =>
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    }

    if (isAdmin) {
      authAdminContext.login({
        email,
        password
      });
    } else {
      authContext.login({
        email,
        password
      });
    }
  };
  return (
    <div className="form-container">
      <Alerts />
      <h1>
        {!isAdmin ? "User " : "Administrator "}{" "}
        <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => {
            setIsAdmin(!isAdmin);
          }}
        >
          Login as {isAdmin ? "User" : "Admin"}
        </button>
      </form>
    </div>
  );
};

export default Login;
