import React from "react";
import ReportIssueForm from "./ReportIssueForm";
import Alerts from "../../../layout/Alerts";

const ReportIssueModal = () => {
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
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body modal-lg">
              <Alerts />
              <ReportIssueForm />
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

export default ReportIssueModal;
