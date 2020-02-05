import React, { useContext } from "react";
import ProjectContext from "../../../../context/project/projectContext";
import ViewProject from "./ViewProject";

const ViewProjectModal = () => {
  const projectContext = useContext(ProjectContext);
  const { clearCurrentProject } = projectContext;
  return (
    <div>
      <div
        className="modal fade"
        id="viewProject"
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
              <ViewProject />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => clearCurrentProject()}
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

export default ViewProjectModal;
