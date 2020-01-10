import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ title, icon, onHideNav }) => {
  return (
    <header className="header bg-primary text-light">
      <div>
          <button className="btn btn-primary" onClick={onHideNav}>
            <i className="fas fa-bars"></i>
          </button>
          {" "}
          <span>
            <i className={icon}></i> {title}
          </span>
      </div>
    </header>
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
