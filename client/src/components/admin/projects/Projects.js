import React, { useEffect, useContext } from "react";
import ProjectItem from "./ProjectItem";
import ProjectFilter from "./ProjectFilter";
import ProjectContext from "../../../context/project/projectContext";
import Spinner from "../../../assets/img/spinner.gif";

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects, loading, filtered } = projectContext;

  useEffect(() => {
    getProjects();
    //eslint-disable-next-line
  }, []);

  if (projects !== null && projects.length === 0 && !loading) {
    return <h4>No projects...</h4>;
  }

  return (
    <div
      className="card"
      style={{
        marginTop: "20px"
      }}
    >
      <div className="card-header bg-primary text-light">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Projects
        </span>
      </div>
      <div className="card-body">
        <div className="card-header">
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="modal"
            data-target="#addProject"
          >
            <i className="far fa-plus-square"></i> Create New Project
          </button>
          <span className="float-right">
            <ProjectFilter />
          </span>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects !== null && !loading ? (
                filtered !== null ? (
                  filtered.map(project => (
                    <ProjectItem key={project._id} project={project} />
                  ))
                ) : (
                  projects.map(project => (
                    <ProjectItem key={project._id} project={project} />
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" align="center">
                    <img src={Spinner} alt="spinner" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
