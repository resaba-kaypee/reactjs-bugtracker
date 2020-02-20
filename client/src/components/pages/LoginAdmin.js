import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";
import Alerts from "../layout/Alerts";
import Users from "../../assets/img/users.png";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const authAdminContext = useContext(AuthAdminContext);

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
    // if (authContext.isAuthenticated && authContext.user !== null) {
    //   if(!authContext.loading && authContext.user.role === "admin"){
    //     props.history.push("/admin/overview");
    //   } else if (!authContext.loading && authContext.user.role === "developer"){
    //     props.history.push("/user/home");
    //   }
    // }

    if (authContext.error === "Invalid Credentials") {
      setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }

    // eslint-disable-next-line
  }, [
    authContext.error,
    authContext.user,
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
  const [checked, setChecked] = useState(false);
  // const [isShowing, setIsShowing] = useState(false);

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
    } else {
      authContext.login({
        email,
        password,
        role
      });
    }

    // if (isAdmin) {
    //   authAdminContext.login({
    //     email,
    //     password
    //   });
    // } else {
    //   authContext.login({
    //     email,
    //     password
    //   });
    // }
  };
  return (
    <div className="container">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <form>
          <div className="card border-primary my-5">
            <h4 className="card-header bg-primary text-light">
              <span className="h5">
                <i className="fas fa-user"></i> Log in as user
              </span>
              <span className="material-switch float-right">
                <input
                  id="someSwitchOptionDefault"
                  name="someSwitchOption001"
                  type="checkbox"
                  checked={checked}
                  onChange={()=> setChecked(!checked)}
                />
                <label
                  for="someSwitchOptionDefault"
                  className="label-default"
                ></label>
              </span>
            </h4>
            <div className="card-body">
              <div>
                <input type="email" name="email" className="form-control" placeholder="Email..."/>
              </div>
                <hr/>
              <div>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={isShowing ? "text" : "password"}
                    placeholder="Password..."
                    name="password"
                    // value={password}
                    // onChange={handleChange}
                  />
                  <span className="input-group-append">
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
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer bg-light">
              <button className="btn btn-primary">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // <div className="container">
    //   <div className="card-login card-container">
    //     <img
    //       id="profile-img"
    //       className="profile-img-card"
    //       src={Users}
    //       alt="img"
    //     />
    //     <p id="profile-name" className="profile-name-card"></p>
    //     <Alerts />
    //     <h2 className="page-header">
    //       {!isAdmin ? "User " : "Administrator "}{" "}
    //       <span className="text-primary">Login</span>
    //     </h2>
    //     <form className="form-signin" onSubmit={onSubmit} noValidate>
    //       <span id="reauth-email" className="reauth-email"></span>
    //       <input
    //         type="email"
    //         id="inputEmail"
    //         className="form-control"
    //         placeholder="Email address"
    //         name="email"
    //         value={email}
    //         onChange={onChange}
    //         autoFocus
    //       />
    //       <input
    //         type="password"
    //         id="inputPassword"
    //         className="form-control"
    //         placeholder="Password"
    //         name="password"
    //         value={password}
    //         onChange={onChange}
    //       />
    //       <div id="remember" className="checkbox"></div>
    //       <button
    //         className="btn btn-lg btn-primary btn-block btn-signin"
    //         type="submit"
    //       >
    //         Login
    //       </button>
    //       <button
    //         type="button"
    //         className="btn btn-primary btn-block btn-signin"
    //         onClick={() => {
    //           setIsAdmin(!isAdmin);
    //           setRole(isAdmin ? "admin" : "developer")
    //           console.log(role)
    //         }}
    //       >
    //         Login as {isAdmin ? "User" : "Admin"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
