import React from "react";

const PagenotFound = () => {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh",
        color: "aliceblue"
      }}
    >
      <div className="d-flex justify-content-center" style={{ height: "100%" }}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 style={{ fontSize: "6rem" }}>404 Page not found</h3>
        </div>
      </div>
    </div>
  );
};

export default PagenotFound;
