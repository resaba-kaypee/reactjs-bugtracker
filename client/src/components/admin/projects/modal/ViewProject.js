import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import ViewProjectIssueList from "./ViewProjectIssueList";
import ProjectContext from "../../../../context/project/projectContext";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import IssueContext from "../../../../context/issue/issueContext"

const ViewProject = () => {
  const projectContext = useContext(ProjectContext);
  const { current } = projectContext;

  const issueContext = useContext(IssueContext);
  const { getIssues, issues } = issueContext;

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescripton] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getIssues();
    if (current !== null) {
      setProjectName(current.projectName);
      setStatus(current.status);
      setDescripton(current.description);
      setDate(current.date);
    }
    // eslint-disable-next-line
  }, [current]);

  const fontWeight = {
    fontWeight: 600
  };
  return (
    <div>
      <div className="border">
        <div className="card-header bg-primary text-light">
          <span className="h4">
            <i className="fas fa-puzzle-piece"></i> Viewing Project
          </span>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead></thead>
            <tbody>
              <tr>
                <td
                  style={{
                    width: "40%"
                  }}
                >
                  <label style={fontWeight}>Project Name</label>
                </td>
                <td>{projectName}</td>
              </tr>

              <tr>
                <td>
                  <label style={fontWeight}>Current Status</label>
                </td>
                <td>{status}</td>
              </tr>

              <tr>
                <td>
                  <label style={fontWeight}>Description</label>
                </td>
                <td>{description}</td>
              </tr>

              <tr>
                <td>
                  <label style={fontWeight}>Date created</label>
                </td>
                <td>
                  <Moment format="MMMM Do YYYY, h:mm:ss a" date={date} />
                </td>
              </tr>

              <tr>
                <td>
                  <label style={fontWeight}>Assigned Tech to Project</label>
                </td>
                <td>
                  <ul className="list-group">
                    {current !== null && current.techs.length > 0 ? (
                      current.techs.map(tech => (
                        <li className="list-group-item" key={tech}>
                          {tech}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">--No techs assigned--</li>
                    )}
                  </ul>
                </td>
              </tr>

              <tr>
                <td colSpan="2" align="center" style={fontWeight}>
                  Issues
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <ul
                    className="list-group"
                    style={{
                      maxHeight: "200px",
                      overflow: "scroll"
                    }}
                  >
                    {issues !== null && issues.length > 0 ? (
                      issues.map(issue =>
                        issue.projectName === projectName ? (
                          <ViewProjectIssueList key={issue._id} issue={issue} />
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <li className="list-group-item">--No issues--</li>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
