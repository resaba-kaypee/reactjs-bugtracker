import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "../../../../context/project/projectContext";

const UpdateProjectFormTechList = ({ user, projectID }) => {
  const projectContext = useContext(ProjectContext);
  const { removeUser } = projectContext;
  const { name } = user;

  const removeTech = () => {
    const remove = {
      _id: projectID,
      techID: user._id
    };
    removeUser(remove);
  };

  return (
    <Fragment>
      <li className="list-group-item">
        {name}
        <button
          type="button"
          className="btn btn-light float-right"
          title="Remove Tech"
          onClick={removeTech}
        >
          <i className="fas fa-user-alt-slash"></i>
        </button>
      </li>
    </Fragment>
  );
};

UpdateProjectFormTechList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UpdateProjectFormTechList;
