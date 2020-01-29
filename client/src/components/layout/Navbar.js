import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import AuthAdminContext from "../../context/authAdmin/authAdminContext";

const Navbar = ({ title, icon }) => {
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
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">
        <h3>
          <i className={icon} /> {title}
        </h3>
      </div>
    </nav>
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
