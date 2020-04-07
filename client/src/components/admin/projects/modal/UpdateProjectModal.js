import React, { useContext } from "react";
import UpdateProjectForm from "./UpdateProjectForm";
import ProjectContext from "../../../../context/project/projectContext";
import Alerts from "../../../layout/Alerts";

const UpdateProjectModal = () => {
  const projectContext = useContext(ProjectContext);
  const { clearCurrentProject, clearProjectError } = projectContext;
  return (
    <div>
      <div
        className="modal fade"
        id="updateProject"
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body modal-lg">
              <UpdateProjectForm />
            </div>
            <div className="modal-footer">
              <Alerts />
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  clearCurrentProject();
                  clearProjectError();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectModal;
