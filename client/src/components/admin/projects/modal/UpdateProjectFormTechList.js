import React, { Fragment, useContext } from "react";
import ProjectContext from "../../../../context/project/projectContext";

const UpdateProjectFormTechList = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { _id, techs } = project;
  const { removeUser } = projectContext;

  const removeTech = ({ target }) => {
    console.log(target.id);
    const remove = {
      _id: _id,
      tech: target.id
    };

    removeUser(remove);
  };

  return (
    <Fragment>
      {techs !== null && techs.length > 0 ? (
        techs.map(tech => (
          <li className="list-group-item" key={tech}>
            {tech}
            <button
              id={tech}
              className="btn btn-light float-right"
              title="Remove Tech"
              onClick={e => removeTech(e)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))
      ) : (
        <li className="list-group-item">--No assigned tech--</li>
      )}
    </Fragment>
  );
};

// {techs.map(tech => (
//   <li className="list-group-item" key={tech} onMouseEnter={()=> setRemovedTech(tech)}>
//     {tech}
//     <button
//       className="btn btn-light float-right"
//       title="Remove Tech"
//       onClick={() => removeTech()}
//     >
//       <i className="fas fa-trash-alt"></i>
//     </button>
//   </li>
// ))}

export default UpdateProjectFormTechList;
