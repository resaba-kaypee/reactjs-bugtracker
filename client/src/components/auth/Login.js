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
      props.history.push("/dashBoard/home");
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
    <div className="container">
      <div className="card-login card-container">
        <img
          id="profile-img"
          className="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="img"
        />
        <p id="profile-name" className="profile-name-card"></p>
        <Alerts />
        <h2 className="page-header">
          {!isAdmin ? "User " : "Administrator "}{" "}
          <span className="text-primary">Login</span>
        </h2>
        <form className="form-signin" onSubmit={onSubmit} noValidate>
          <span id="reauth-email" className="reauth-email"></span>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={onChange}
            autoFocus
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <div id="remember" className="checkbox"></div>
          <button
            className="btn btn-lg btn-primary btn-block btn-signin"
            type="submit"
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary btn-block btn-signin"
            onClick={() => {
              setIsAdmin(!isAdmin);
            }}
          >
            Login as {isAdmin ? "User" : "Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
