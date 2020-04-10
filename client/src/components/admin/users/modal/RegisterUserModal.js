import React from "react";
import Alerts from "../../../layout/Alerts";
import RegisterUserForm from "./RegisterUserForm";

const RegisterUserModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="addUser"
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
              <RegisterUserForm />
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

export default RegisterUserModal;
