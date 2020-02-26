import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const LogItem = ({ log }) => {
  const { action, date, firstName, lastName, role } = log;

  return (
    <Fragment>
      <td>
        <strong>{firstName} {lastName} ({role})</strong> just {action} on{" "}
        <strong>
          <Moment format="MMMM Do YYYY, h:mm:ss a" date={date} />
        </strong>
      </td>
    </Fragment>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
