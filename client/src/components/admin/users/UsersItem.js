import React, { useContext,Fragment } from "react";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";

const UsersItem = ({ user }) => {
  const authAdminContext = useContext(AuthAdminContext);
  const { deleteUser } = authAdminContext;
  const { _id, role, firstName, lastName } = user;
  
  const onDelete = () => {
    deleteUser(_id);
  };

  return (
    <tr>
      {/* <td>{_id.slice(0, 12)}</td> */}
      <td>{role}</td>
      <td>
        {firstName} {lastName}
        <button
          className="btn btn-light float-right"
          title="Delete User"
          onClick={() => onDelete()}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default UsersItem;
