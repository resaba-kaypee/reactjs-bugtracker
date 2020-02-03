import React from "react";
import AdminIssueForm from "./AdminIssueForm"
import Alerts from "../../../layout/Alerts"

const AddIssueModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="addIssueAdmin"
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <Alerts/>
              <AdminIssueForm />
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
