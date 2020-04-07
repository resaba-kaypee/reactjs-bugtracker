import React, { useContext } from "react";
import AddProjectForm from "./AddProjectForm";
import ProjectContext from "../../../../context/project/projectContext";
import Alerts from "../../../layout/Alerts";

const AddProjectModal = () => {
  const projectContext = useContext(ProjectContext);
  const { clearProjectError } = projectContext;
  return (
    <div>
      <div
        className="modal fade"
        id="addProject"
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
            <div className="modal-body">
              <AddProjectForm />
            </div>
            <div className="modal-footer">
              <Alerts />
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={()=> clearProjectError()}
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

export default AddProjectModal;
