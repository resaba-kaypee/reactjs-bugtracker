import React, { useEffect, useContext } from "react";
import AuthAdminContext from "../../../context/authAdmin/authAdminContext";
import Spinner from "../../../assets/img/spinner.gif";
import UserFilter from "./UserFilter";
import UsersItem from "./UsersItem";

const Users = () => {
  const authAdminContext = useContext(AuthAdminContext);
  const { getAllUsers, users, loading, filtered } = authAdminContext;

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card card-custom shadow bg-white rounded" >
      <div className="card-header bg-info text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-users"></i> Manage Users
        </span>
      </div>
      <div className="card-body" style={{ overflowY: "scroll" }}>
        <div className="card-header flex-space-between shadow bg-white rounded">
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
                filtered !== null ? (
                  filtered.map(user => <UsersItem key={user._id} user={user} />)
                ) : (
                  users.map(user => <UsersItem key={user._id} user={user} />)
                )
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
