import React, { Fragment } from "react";
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

export default UpdateProjectFormTech;
