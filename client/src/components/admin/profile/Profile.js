import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [dateStatus, setDateStatus] = useState(new Date());

  useEffect(() => {
    const clock = setInterval(() => setDateStatus(new Date()), 1000);

    return () => clearInterval(clock);
  }, []);

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
          <time className="time">{dateStatus.toLocaleTimeString()}</time>
          <h1
            style={{
              marginBottom: "2rem"
            }}
          >
            {dateStatus.getHours() < 12
              ? "Good Morning"
              : dateStatus.getHours() < 18
              ? "Good Afternoon"
              : "Good Evening"}{" "}
            <span>{user && user.firstName + " " + user.lastName}</span>
          </h1>
          <h3>What Is Your Focus For Today?</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
