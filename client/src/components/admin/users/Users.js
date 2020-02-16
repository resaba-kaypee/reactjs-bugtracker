import React, { useEffect, useContext } from "react";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import Spinner from "../../../assets/img/spinner.gif"
import UserFilter from "./UserFilter";

const Users = () => {
  const authAdminContext = useContext(AuthAdminContext);
  const { getAllUsers, users, loading } = authAdminContext;

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="card shadow bg-white rounded"
      style={{
        marginTop: "20px"
      }}
    >
      <div className="card-header bg-primary text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-puzzle-piece"></i> Viewing All Users
        </span>
      </div>
      <div className="card-body">
        <div className="card-header shadow bg-white rounded">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-toggle="modal"
            data-target="#addUser"
          >
            <i className="fas fa-plus"></i> Add New User
          </button>
          <UserFilter />
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    width: "20%"
                  }}
                >
                  ID
                </th>
                <th
                  scope="col"
                  style={{
                    width: "20%"
                  }}
                >
                  Role
                </th>
                <th
                  scope="col"
                  style={{
                    width: "60%"
                  }}
                >
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {users !== null && !loading ? (
                users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id.slice(0, 12)}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.firstName} {user.lastName}
                      <button
                        className="btn btn-light float-right"
                        title="Delete User"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" align="center">
                    <img src={Spinner} alt="spinner" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
