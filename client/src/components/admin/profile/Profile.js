import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [dateStatus, setDateStatus] = useState(new Date());
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(
      setInterval(() => {
        setDateStatus(new Date());
      }, 1000)
    );
    return () => clearInterval(date);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh"
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div>
          <h1>Good Morning</h1>
          <h2>{user && user.firstName + " " + user.lastName}</h2>
          <div className="d-flex flex-column">
            <h3 className="d-flex justify-content-center">
              {dateStatus.toLocaleTimeString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
