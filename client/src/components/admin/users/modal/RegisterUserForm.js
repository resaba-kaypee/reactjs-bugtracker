import React, { useState, useContext, useEffect } from "react";
import useForm from "../../validate/useForm";
import validate from "../../validate/validate";
import AlertContext from "../../../../context/alert/alertContext";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";

const RegisterUserForm = () => {
  const [isShowing, setIsShowing] = useState(false);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authAdminContext = useContext(AuthAdminContext);

  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    register,
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      role: ""
    },
    validate
  );

  const { firstName, lastName, email, password, password2, role } = values;

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
    if (errors && errors.firstName) {
      setAlert(errors.firstName, "danger");
      setErrors({});
    }
    if (errors && errors.lastName) {
      setAlert(errors.lastName, "danger");
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
    authAdminContext.registerUser({
      firstName,
      lastName,
      email,
      password,
      role
    });
  }
  return (
    <div>
      <div className="border">
        <div className="card-header bg-primary text-light">
          <span className="h4">
            <i className="fas fa-plus"></i> Register New User
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <label>Role</label>
                  </td>
                  <td>
                    <select
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={handleChange}
                      onBlur={handleChange}
                      required
                    >
                      <option value="">--Select---</option>
                      <option value="admin">admin</option>
                      <option value="developer">developer</option>
                      <option value="updater">updater</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>First Name</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      placeholder="Enter first name..."
                      value={firstName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Last Name</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      placeholder="Enter last name..."
                      value={lastName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Email</label>
                    <small className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter email..."
                      value={email}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Password</label>
                    <small className="form-text text-muted">
                      Must be 6-20 alphanumeric characters long.
                    </small>
                  </td>
                  <td>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type={isShowing ? "text" : "password"}
                        placeholder="Enter password..."
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          onClick={() => setIsShowing(!isShowing)}
                        >
                          <i
                            className={
                              "fas " + (isShowing ? "fa-eye-slash" : "fa-eye")
                            }
                          ></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Confirm Password</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="password"
                      name="password2"
                      placeholder="Confirm password..."
                      value={password2}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary float-right"
                    >
                      <i className="fas fa-plus"></i> Register
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserForm;
