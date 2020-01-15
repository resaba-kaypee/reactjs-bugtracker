import React, { useContext, useEffect, useState } from "react";
import useForm from "../validate/useForm";
import validate from "../validate/validate";
import AlertContext from "../../context/alert/alertContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import Alerts from "../layout/Alerts";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authAdminContext = useContext(AuthAdminContext);

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
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

    // check if admin or user is already exist in db
    if (authAdminContext.error) {
      setAlert(authAdminContext.error, "danger");
      authAdminContext.clearErrors();
    }

    if (authAdminContext.success) {
      setAlert(authAdminContext.success, "success");
      authAdminContext.clearSuccess();
    }
    
    // check if there is an error in validating forms
    if (errors && errors.name) {
      setAlert(errors.name, "danger");
      setErrors({});
    }
    if (errors && errors.email) {
      setAlert(errors.email, "danger");
      setErrors({});
    }
    if (errors && errors.password) {
      setAlert(errors.password, "danger");
      setErrors({});
    }
    if (errors && errors.password2) {
      setAlert(errors.password2, "danger");
      setErrors({});
    }
    // eslint-disable-next-line
  }, [errors, authAdminContext.error, authAdminContext.success]);

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
    // setAlert("Register", "success")
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
