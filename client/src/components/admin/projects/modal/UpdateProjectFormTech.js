import React, { Fragment } from "react";
import PropTypes from "prop-types";
import UpdateProjectFormTechList from "./UpdateProjectFormTechList";

const UpdateProjectFormTech = ({ techs, projectID }) => {
  return (
    <Fragment>
      {techs !== null && techs.length > 0 ? (
        techs.map(tech => (
          <UpdateProjectFormTechList key={tech._id} user={tech} projectID={projectID} />
        ))
      ) : (
        <li className="list-group-item">--No assigned tech--</li>
      )}
    </Fragment>
  );
};

UpdateProjectFormTech.propTypes = {
  techs: PropTypes.object.isRequired,
}

export default UpdateProjectFormTech;
