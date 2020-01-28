import React from "react";

const Projects = () => {
  return (
    <div className="card" style={{
      marginTop: "20px"
    }}>
      <div className="card-header bg-primary text-light">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Projects
        </span>
      </div>
      <div className="card-body">
        <div className="card-header">
          <button className="btn btn-primary" type="button">
            <i className="far fa-plus-square"></i> Create New Project
          </button>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bugtacker App</td>
                <td>development</td>
                <td>Simple bug tracking app</td>
                <td>January 24th 2020, 4:37:20 am</td>
              </tr>
              <tr>
                <td>Sole Nation</td>
                <td>development</td>
                <td>E-commerce web app</td>
                <td>January 24th 2020, 4:37:20 am</td>
              </tr>
              <tr>
                <td>Fancy House</td>
                <td>development</td>
                <td>Realstate web app</td>
                <td>January 24th 2020, 4:37:20 am</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;
