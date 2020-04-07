import React from "react";
import AddProjectForm from "./AddProjectForm";
import Alerts from "../../../layout/Alerts";

const AddProjectModal = () => {
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
