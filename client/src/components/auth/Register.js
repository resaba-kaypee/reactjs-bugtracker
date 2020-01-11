import React, { useContext, useEffect } from "react";
import useForm from "../validate/useForm";
import validate from "../validate/validate";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/auth/authAdminContext";
import Alerts from "../layout/Alerts"

const Register = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { error, clearErrors, isAuthenticated, register } = authContext;
  const authAdminContext = useContext(AuthAdminContext)

  const { handleChange, handleSubmit, user, errors } = useForm(
    registerUser,
    registerAdmin,
    validate
  );
  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }

    if (authContext.error === "User already exists") {
      setAlert(authContext.error, "danger");
      clearErrors();
    }

    if (error === "Admin already exists") {
      setAlert(error, "danger");
      clearErrors();
    }

    if (errors && errors.name) {
      setAlert(errors.name, "danger");
    }
    if (errors && errors.email) {
      setAlert(errors.email, "danger");
    }
    if (errors && errors.password) {
      setAlert(errors.password, "danger");
    }
    if (errors && errors.password2) {
      setAlert(errors.password2, "danger");
    }

    // eslint-disable-next-line
  }, [error, errors, isAuthenticated, props.history]);

  function registerUser() {
      register({
      name,
      email,
      password
    });
  }

  function registerAdmin() {
    register({
    name,
    email,
    password
  });
}

  return (
    <div className="form-container">
      <Alerts/>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
