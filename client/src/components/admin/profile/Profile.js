import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [tech, setTech] = useState("");
  const [dateStatus, setDateStatus] = useState(new Date());
  // eslint-disable-next-line
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(
      setInterval(() => {
        setDateStatus(new Date());
      }, 1000)
    );
    return clearInterval(dateStatus);
  }, [dateStatus]);

  const [time, setTime] = useState({});
  const { h, m, s } = time;
  let hour = h % 12;
  hour = hour ? hour : 12;
  const minute = m < 10 ? "0" + m : m;
  const second = s < 10 ? "0" + s : s;
  const ampm = h >= 12 ? "PM" : "AM";

  useEffect(() => {
    setTime({
      h: dateStatus.getHours(),
      m: dateStatus.getMinutes(),
      s: dateStatus.getSeconds()
    });
  }, [dateStatus]);

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      const username = user.firstName + " " + user.lastName;
      setTech(username);
    }
  }, [user]);

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
          <h2>Welcome {tech}</h2>
          <div className="d-flex flex-column">
            <h3 className="d-flex justify-content-center">
              <span>{hour}</span>:<span>{minute}</span>:<span>{second}</span>{" "}
              <span>{ampm}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
