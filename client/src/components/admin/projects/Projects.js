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

  return (
    <div
      className="card shadow bg-white rounded"
      style={{
        marginTop: "20px"
      }}
    >
      <div className="card-header bg-primary text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Viewing Projects
        </span>
      </div>
      <div className="card-body">
        <div className="card-header shadow bg-white rounded">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="modal"
            data-target="#addProject"
          >
            <i className="fas fa-plus"></i> Create New Project
          </button>

          <ProjectFilter />
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
