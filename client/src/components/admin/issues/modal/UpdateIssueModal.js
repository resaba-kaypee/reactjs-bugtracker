import React, { useContext } from "react";
import AuthAdminContext from "../../../../context/authAdmin/authAdminContext";
import UpdateIssueForm from "./UpdateIssueForm";
import Alerts from "../../../layout/Alerts";

const UpdateIssueModal = () => {
  const authAdminContext = useContext(AuthAdminContext);
  const { clearCurrent } = authAdminContext;
  return (
    <div>
      <div
        className="modal fade"
        id="UpdateIssue"
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
              <UpdateIssueForm />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => clearCurrent()}
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

export default UpdateIssueModal;
