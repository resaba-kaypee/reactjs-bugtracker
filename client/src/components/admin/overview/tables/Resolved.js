import React, { useState } from "react";

const CardResolved = () => {
  const [isDropped, setIsDroppped] = useState(false);
  const handleClick = () => setIsDroppped(!isDropped);
  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-header bg-primary text-light">
        <span className="h4">
          <i className="fas fa-list-alt"></i> Resolved Issues
        </span>
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={handleClick}
        >
          <i
            className={"fas " + (isDropped ? "fa-arrow-up" : "fa-arrow-down")}
          ></i>
        </button>
      </div>
      <div className="card-body">
        {isDropped ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Project Name</th>
                <th scope="col">Summary</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Bugtacker App</td>
                <td>Simple bug tracking app</td>
                <td>Sam Smith</td>
                <td>January 24th 2020, 4:37:20 am</td>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardResolved;
