import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";

const Navbar = ({ title, icon, onHideNav }) => {
  const authAdminContext = useContext(AuthAdminContext);
  const authContext = useContext(AuthContext);

  const [admin, setAdmin] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (authAdminContext.admin && authAdminContext.admin.name) {
      setAdmin(authAdminContext.admin.name);
    } else if (authContext.user && authContext.user.name) {
      setUser(authContext.user.name);
    }

    // eslint-disable-next-line
  }, [admin, user, authContext, authAdminContext]);

  return (
    <div className="bg-primary text-light d-flex justify-content-between align-items-center">
      <div>
        <button className="btn btn-primary" onClick={onHideNav}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div>
        <h1>
          <span>
            <i className={icon} /> {title}
          </span>
        </h1>
      </div>
      <div>
        <div>
        {/* <span>Hello asdasdas{admin ? admin : user}</span> */}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "BugTracker",
  icon: "fas fa-bug"
};

export default Navbar;
