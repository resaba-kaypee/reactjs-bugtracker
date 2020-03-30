import React, { useEffect, useContext } from "react";
import ProjectItem from "./ProjectItem";
import ProjectFilter from "./ProjectFilter";
import ProjectContext from "../../../context/project/projectContext";
import Spinner from "../../layout/Spinner";

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects, loading, filtered } = projectContext;

  useEffect(() => {
    getProjects();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="card card-custom shadow bg-white rounded">
      <div className="card-header bg-dark text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Manage Projects
        </span>
      </div>
      <div className="card-body">
        <nav className="navbar flex-space-between shadow bg-white rounded">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="modal"
            data-target="#addProject"
          >
            <i className="fas fa-plus"></i> Create New Project
          </button>

          <ProjectFilter />
        </nav>
        <div className="card-body card-body-list">
          {/* project item */}
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
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
