import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const LogItem = ({ log }) => {
  const { action, date, username} = log;

  return (
    <Fragment>
      <span>{username} just {action}</span> on{" "}
      <Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment>
    </Fragment>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
