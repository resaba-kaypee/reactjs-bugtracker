import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import Alerts from "../layout/Alerts";
// import Users from "../../assets/img/users.png";
import Admin from "../../assets/img/Admin-icon-plain.png";
import User from "../../assets/img/User-icon-plain.png";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  // const authAdminContext = useContext(AuthAdminContext);

  useEffect(() => {
    // authenticate admin
    // if (authAdminContext.isAuthenticated) {
    //   props.history.push("/admin/overview");
    // }
    // if (authAdminContext.error === "Invalid Credentials") {
    //   setAlert(authAdminContext.error, "danger");
    //   authAdminContext.clearErrors();
    // }

    // authenticate user
    if (authContext.isAuthenticated && authContext.user !== null) {
      if(!authContext.loading && authContext.user.role === "admin"){
        props.history.push("/admin/overview");
      } else if (!authContext.loading && authContext.user.role === "developer"){
        props.history.push("/user/home");
      }
    }
    if (authContext.error === "Invalid Credentials") {
      setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [
    authContext.error,
    authContext.user,
    authContext.isAuthenticated,
    // authAdminContext.error,
    // authAdminContext.isAuthenticated,
    props.history
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [checked, setChecked] = useState(true);
  const [isShowing, setIsShowing] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const values = {
      email,
      password,
      role
    };

    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      authContext.login(values);
    }
  };
  return (
    <div className="container">
      <div className="card my-5">
        <div className="card-header bg-primary text-light text-center">
          <span className="h4">
            <i className="fas fa-bug"></i> Bugtracker
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <table className="table table-curved">
              <tbody>
                <tr className="text-light bg-secondary">
                  <td colSpan="2">
                    <span className="h5">
                      <i
                        className={
                          "fas " + (!checked ? "fa-user-shield" : "fa-user")
                        }
                      ></i>{" "}
                      Log in as {checked ? "User" : "Administrator"}
                    </span>
                    <span className="material-switch float-right">
                      <input
                        id="role"
                        name="role"
                        type="checkbox"
                        checked={!checked}
                        onClick={() => setChecked(!checked)}
                        onChange={() =>
                          setRole(!checked ? "developer" : "admin")
                        }
                      />
                      <label htmlFor="role" className="label-default"></label>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Email</label>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Password</label>
                  </td>
                  <td>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type={isShowing ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="input-group-text"
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
                  <td colSpan="2">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary float-right"
                    >
                      <i className="fas fa-sign-in-alt"></i> Sign in
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

export default Login;
