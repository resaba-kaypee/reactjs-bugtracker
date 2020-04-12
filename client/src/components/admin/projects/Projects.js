import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
// component
import ProjectItem from "./ProjectItem";
import ProjectFilter from "./ProjectFilter";
import Spinner from "../../layout/Spinner";
// state | context
import ProjectContext from "../../../context/project/projectContext";
import AuthContext from "../../../context/auth/authContext";

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects, loading, filtered } = projectContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    getProjects();
    //eslint-disable-next-line
  }, []);

  if (user && user.role !== "admin") {
    return <Redirect to={`/dashboard/home/${user.role}`} />;
  }

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
            ) : Object.keys(projects).length > 0 ? (
              projects.map(project => (
                <ProjectItem key={project._id} project={project} />
              ))
            ) : (
              <h3>No projects found, Let's create one!</h3>
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
