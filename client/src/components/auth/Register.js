import React, { useContext, useEffect, useState } from "react";
import useForm from "../validate/useForm";
import validate from "../validate/validate";
import AlertContext from "../../context/alert/alertContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import Alerts from "../layout/Alerts";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authAdminContext = useContext(AuthAdminContext);

  const { handleChange, handleSubmit, values, errors } = useForm(
    register,
    {
      name: "",
      email: "",
      password: "",
      password2: ""
    },
    validate
  );

  const { name, email, password, password2 } = values;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    authAdminContext.loadAdmin();

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
  }, [errors, authAdminContext]);

  function register() {
    if (isAdmin) {
      authAdminContext.registerAdmin({
        name,
        email,
        password
      });
    } else {
      authAdminContext.registerUser({
        name,
        email,
        password
      });
    }
  }

  return (
    <div className="form-container">
      <Alerts />
      <h1>
        {!isAdmin ? "User" : "Admin"}{" "}
        <span className="text-primary">Register</span>
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
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          Register as {isAdmin ? "User" : "Admin"}
        </button>
      </form>
    </div>
  );
};

export default Register;
