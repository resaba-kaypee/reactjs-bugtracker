import React from "react";
import AddIssueForm from "./AddIssueForm"
import Alerts from "../../components/layout/Alerts"

const AddIssueModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="addIssue"
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <Alerts/>
              <AddIssueForm />
            </div>
            <div className="modal-footer">
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

export default AddIssueModal;