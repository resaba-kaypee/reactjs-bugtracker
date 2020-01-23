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
    <div className="card card-container">
         <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> 
        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
        <p id="profile-name" className="profile-name-card"></p>
        <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <div id="remember" className="checkbox">
            </div>
            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
        </form> /form 
        <a href="#" className="forgot-password">
            Forgot the password?
        </a>
    </div>
</div>
    );
  };
  // <div className="container">
  //   <div className="d-flex justify-content-center">
  //     <div className="align-self-center col-md-8">
  //       <form className="bordered" onSubmit={onSubmit} noValidate>
  //         <Alerts />
  //         <h2 className="page-header">
  //           {!isAdmin ? "User " : "Administrator "}{" "}
  //           <span className="text-primary">Login</span>
  //         </h2>
  //         <div className="form-group align-self-center">
  //           <label htmlFor="email">Email Address</label>
  //           <input
  //             type="email"
  //             name="email"
  //             value={email}
  //             onChange={onChange}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type="password"
  //             name="password"
  //             value={password}
  //             onChange={onChange}
  //           />
  //         </div>

  //         <button type="submit" className="btn btn-primary btn-block">
  //           Login
  //         </button>

  //         <button
  //           type="button"
  //           className="btn btn-primary btn-block"
  //           onClick={() => {
  //             setIsAdmin(!isAdmin);
  //           }}
  //         >
  //           Login as {isAdmin ? "User" : "Admin"}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // </div>


export default Login;
